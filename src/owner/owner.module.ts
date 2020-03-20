import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Owner]),
  ],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule { }
