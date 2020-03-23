import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Repository, DeleteResult, LessThanOrEqual } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>) { }

  /**
   * Remove owners who bought their cars before the last 18 months
   *
   * @return {Promise<DeleteResult>} Resoult of deleted owners
   */
  removeOutdatedOwners(): Promise<DeleteResult> {
    return this.ownerRepository.delete({
      purchaseDate: LessThanOrEqual(
        moment().subtract(18, 'months').toDate()
      )
    });
  }
}
