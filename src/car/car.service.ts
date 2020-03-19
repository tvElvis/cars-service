import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
  ) { }

  async createCar(createCatDto: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturerService.findById(createCatDto.manufacturerId);

    const car = this.carRepository.create(createCatDto);
    car.manufacturer = manufacturer;

    return this.carRepository.save(car)
  }

  async findCarById(id: string): Promise<Car> {
    const manufacturer = await this.carRepository.findOne(id);

    if (!manufacturer) {
      throw new NotFoundException('Car not found.');
    }
    return manufacturer;
  }
}
