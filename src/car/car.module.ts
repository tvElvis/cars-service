import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarController } from './car.controller';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Car]),
    ManufacturerModule
  ],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
