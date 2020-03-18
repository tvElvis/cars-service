import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacurer } from './manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturerService {
  constructor(@InjectRepository(Manufacurer) private readonly manufacurerRepository: Repository<Manufacurer>) { }

}
