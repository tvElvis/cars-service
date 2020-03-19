import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturerService {
  constructor(@InjectRepository(Manufacturer) private readonly manufacturerRepository: Repository<Manufacturer>) { }

}
