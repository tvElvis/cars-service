import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository, Like } from 'typeorm';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ResponseCarDto } from './dto/response-car.dto';
import { FindCarListDto } from './dto/find-car-list.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
  ) { }

  async createCar(createCatDto: CreateCarDto): Promise<ResponseCarDto> {
    const manufacturer = await this.manufacturerService.findById(createCatDto.manufacturerId);

    const car = this.carRepository.create(createCatDto);
    car.manufacturer = manufacturer;

    return this.carRepository.save(car)
  }

  async findCarById(id: string): Promise<ResponseCarDto> {
    const manufacturer = await this.carRepository.findOne(id);

    if (!manufacturer) {
      throw new NotFoundException('Car not found.');
    }
    return manufacturer;
  }

  async findCarList(query: FindCarListDto):Promise<ResponseCarDto[]> {
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
}
