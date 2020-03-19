import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturerService {
  constructor(@InjectRepository(Manufacturer) private readonly manufacturerRepository: Repository<Manufacturer>) { }

  async findById(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOne(id);

    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found.');
    }
    return manufacturer;
  }
}
