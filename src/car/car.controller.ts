import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Query, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseCarDto } from './dto/response-car.dto';
import { InvalidPropertyDto } from '../shared/dto/invalid-property.dto';
import { NotFoundDto } from '../shared/dto/not-found.dto';
import { FindCarListDto } from './dto/find-car-list.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ResponseManufacturerDto } from '../manufacturer/dto/response-manufacturer.dto';
import { ResponseReassignDto } from './dto/response-reassign.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
  ) { }

  @ApiOkResponse({ description: 'Outdated owners removed, car\'s discounts updated.', type: ResponseReassignDto })
  @Patch('reassign')
  reassign(): Promise<ResponseReassignDto> {
    return this.carService.reassign();
  }

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
  @ApiBadRequestResponse({ description: 'Invalid id parameter.', type: InvalidPropertyDto })
  findCarById(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseCarDto> {
    return this.carService.findCarById(id);
  }

  @Get()
  @ApiOkResponse({ description: 'The car list has been successfully founded.', type: [ResponseCarDto] })
  @ApiBadRequestResponse({ description: 'Invalid search parameter.', type: InvalidPropertyDto })
  findCarList(@Query() query: FindCarListDto): Promise<ResponseCarDto[]> {
    return this.carService.findCarList(query);
  }

  @ApiOkResponse({ description: 'The car list has been successfully updated.', type: ResponseCarDto })
  @ApiBadRequestResponse({ description: 'Invalid car parameter.', type: InvalidPropertyDto })
  @ApiNotFoundResponse({ description: 'Manufacturer not found.', type: NotFoundDto })
  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto): Promise<ResponseCarDto> {
    return this.carService.updateCar(id, updateCarDto);
  }

  @ApiOkResponse({ description: 'The car list has been successfully deleted.', type: ResponseCarDto })
  @ApiBadRequestResponse({ description: 'Invalid id parameter.', type: InvalidPropertyDto })
  @ApiNotFoundResponse({ description: 'Car not found.', type: NotFoundDto })
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseCarDto> {
    return this.carService.deleteCar(id);
  }

  @ApiOkResponse({ description: 'The manufacturer of the car has been successfully founded.', type: ResponseManufacturerDto })
  @ApiNotFoundResponse({ description: 'Car not found.', type: NotFoundDto })
  @ApiBadRequestResponse({ description: 'Invalid id parameter.', type: InvalidPropertyDto })
  @Get(':id/manufacturer')
  findCarManufacturer(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseManufacturerDto> {
    return this.carService.findCarManufacturer(id);
  }
}
