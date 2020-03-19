import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule { }
