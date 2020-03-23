import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository, Like, Between } from 'typeorm';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FindCarListDto } from './dto/find-car-list.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { OwnerService } from '../owner/owner.service';
import * as moment from 'moment';
import { ResponseProceedDto } from './dto/response-proceed.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
    private readonly ownerService: OwnerService,
  ) { }

  async createCar(createCatDto: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturerService.findById(createCatDto.manufacturerId);

    const car = this.carRepository.create(createCatDto);
    car.manufacturer = manufacturer;

    return this.carRepository.save(car)
  }

  async findCarById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(id);

    if (!car) {
      throw new NotFoundException('Car not found.');
    }
    return car;
  }

  async findCarList(query: FindCarListDto): Promise<Car[]> {
    // limit and offset must not be negative
    const take = Math.abs(+query.take) || 20;
    const skip = Math.abs(+query.skip) || 0;
    const filter = query.filter || '';

    const productList = await this.carRepository.find({
      where: {
        model: Like('%' + filter + '%'),
      },
      take,
      skip,
    });

    return productList;
  }

  async updateCar(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    let manufacturer: Manufacturer;
    const car = this.carRepository.create(updateCarDto);

    if (updateCarDto.manufacturerId) {
      manufacturer = await this.manufacturerService.findById(updateCarDto.manufacturerId);
      car.manufacturer = manufacturer;
    }

    await this.carRepository.update(id, car)

    return this.findCarById(id);
  }

  async deleteCar(id: string): Promise<Car> {
    const car = await this.findCarById(id);
    this.carRepository.delete(car.id);
    return car
  }

  async findCarManufacturer(id: string): Promise<Manufacturer> {
    const car = await this.carRepository.findOne({
      where: {
        id,
      },
      relations: ['manufacturer'],
    });

    if (!car) {
      throw new NotFoundException('Car not found.');
    }

    return car.manufacturer;
  }

  async proceed(): Promise<ResponseProceedDto> {
    const removedOwners = await this.ownerService.removeOutdatedOwners();
    const updatedDiscounts = await this.updateDiscounts();

    return {
      removedOwners: removedOwners.affected,
      updatedDiscounts: updatedDiscounts.affected,
    }
  }

  updateDiscounts() {
    const from = moment().subtract(18, 'months').toDate();
    const to = moment().subtract(12, 'months').toDate();

    return this.carRepository.update({
      firstRegistrationDate: Between(from, to),
      discount: 0,
    }, {
      discount: 20,
    });
  }
}
