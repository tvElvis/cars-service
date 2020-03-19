import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Car])],
  providers: [CarService]
})
export class CarModule {}
