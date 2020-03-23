import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository, Like, Between, UpdateResult } from 'typeorm';
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

  /**
   * Create new car method
   *
   * @param {CreateCarDto} createCarDto object with new car params
   * @return {Promise<Car>} A created car 
   */
  async createCar(createCatDto: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturerService.findById(createCatDto.manufacturerId);

    const car = this.carRepository.create(createCatDto);
    car.manufacturer = manufacturer;

    return this.carRepository.save(car)
  }

  /**
   * Find car by id method
   *
   * @param {string} id id of the searched car
   * @return {Promise<Car>} Finded car 
   */
  async findCarById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(id);

    if (!car) {
      throw new NotFoundException('Car not found.');
    }
    return car;
  }

  /**
   * Find many cars method
   *
   * @param {FindCarListDto} query query cars
   * @return {Promise<Car[]>} An array of finded cars
   */
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

  /**
   * Update car method
   *
   * @param {string} id id of the updated car
   * @param {UpdateCarDto} updateCarDto object with optional fields
   * @return {Promise<Car>} An updated car
   */
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

  /**
   * Delete car method
   *
   * @param {string} id Id of the car to delete
   * @return {Promise<Car>} Deleted car
   */
  async deleteCar(id: string): Promise<Car> {
    const car = await this.findCarById(id);
    this.carRepository.delete(car.id);
    return car
  }

  /**
   * Find manufacturer of the car by car id
   *
   * @param {string} id Id of the car
   * @return {Promise<Manufacturer>} Manufacturer of the car
   */
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

  /**
   * A method to remove the owners who bought their cars before the last 18 months and apply a discount of 20% to all cars having a date of first registration between 12 and 18 months 
   *
   * @return {Promise<ResponseProceedDto>} Info about amount of removed owners and updated discounts
   */
  async proceed(): Promise<ResponseProceedDto> {
    const removedOwners = await this.ownerService.removeOutdatedOwners();
    const updatedDiscounts = await this.updateDiscounts();

    return {
      removedOwners: removedOwners.affected,
      updatedDiscounts: updatedDiscounts.affected,
    }
  }

  /**
   * A method to apply 20% to all cars having a date of first registration between 12 and 18 months 
   *
   * @return {Promise<ResponseProceedDto>} Info about amount of removed owners and updated discounts
   */
  private updateDiscounts(): Promise<UpdateResult> {
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
