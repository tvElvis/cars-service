import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseCarDto } from './dto/response-car.dto';
import { InvalidPropertyDto } from 'src/shared/entities/dto/invalid-property.dto';
import { NotFoundDto } from 'src/shared/entities/dto/not-found.dto';
import { FindCarListDto } from './dto/find-car-list.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @Post()
  @ApiCreatedResponse({ description: 'Car has been successfully created.', type: ResponseCarDto })
  @ApiBadRequestResponse({ description: 'Invalid car property.', type: InvalidPropertyDto })
  @ApiNotFoundResponse({ description: 'Manufacturer not found.', type: NotFoundDto })
  createCar(@Body() createCarDto: CreateCarDto): Promise<ResponseCarDto> {
    return this.carService.createCar(createCarDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The car has been successfully founded.', type: ResponseCarDto })
  @ApiNotFoundResponse({ description: 'Car not found.', type: NotFoundDto })
  findCarById(@Param('id') id: string): Promise<ResponseCarDto> {
    return this.carService.findCarById(id);
  }

  @Get()
  @ApiOkResponse({ description: 'The car list has been successfully founded.', type: [ResponseCarDto] })
  @ApiBadRequestResponse({ description: 'Invalid search parameter.', type: InvalidPropertyDto })
  findCarList(@Query() query: FindCarListDto): Promise<ResponseCarDto[]> {
    return this.carService.findCarList(query);
  }
}
