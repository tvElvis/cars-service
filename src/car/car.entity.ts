import { Entity, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/entities/base.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Entity()
export class Car extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  firstRegistrationDate: Date;

  @Column({
    default: 0,
  })
  price: number;

  @OneToMany(type => Manufacturer, manufacturer => manufacturer.cars, { onDelete: 'CASCADE' })
  manufacturer: Manufacturer;
}