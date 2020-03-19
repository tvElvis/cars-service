import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseCarDto } from './dto/response-car.dto';
import { InvalidPropertyDto } from 'src/shared/entities/dto/invalid-property.dto';
import { NotFoundDto } from 'src/shared/entities/dto/not-found.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Post()
  @ApiCreatedResponse({ description: 'Car has been successfully created.', type: ResponseCarDto })
  @ApiBadRequestResponse({ description: 'Invalid car property.', type: InvalidPropertyDto})
  @ApiNotFoundResponse({ description: 'Manufacturer not found.', type: NotFoundDto})
  createCar(@Body() createCarDto: CreateCarDto): Promise<ResponseCarDto> {
    return this.carService.createCar(createCarDto);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Car not found.', type: NotFoundDto})
  findCarById(@Param('id') id: string): Promise<ResponseCarDto> {
    return this.carService.findCarById(id);
  }
}
