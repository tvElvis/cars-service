import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../shared/entities/base.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Entity('car')
export class Car extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  firstRegistrationDate: Date;

  @Column({ length: 50 })
  model: string;

  @Column({
    default: 0,
  })
  price: number;

  @ManyToOne(type => Manufacturer, manufacturer => manufacturer.cars, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  manufacturer: Manufacturer;
}