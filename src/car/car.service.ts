import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private readonly carRepository: Repository<Car>) { }
}
