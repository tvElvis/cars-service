import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './car.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(createCarDto);
  }

  @Get(':id')
  findCarById(@Param('id') id: string): Promise<Car> {
    return this.carService.findCarById(id);
  }
}
