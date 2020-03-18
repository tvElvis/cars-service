import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CarModule,
    ManufacturerModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
