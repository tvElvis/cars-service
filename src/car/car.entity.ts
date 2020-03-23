import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../shared/entities/base.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { Exclude } from 'class-transformer';
import { Owner } from '../owner/owner.entity';

@Entity('car')
export class Car extends BaseEntity {
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  firstRegistrationDate: Date;

  @Column({ length: 50 })
  model: string;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 0,
  })
  discount: number;

  @Exclude()
  @ManyToOne(type => Manufacturer, manufacturer => manufacturer.cars, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  manufacturer: Manufacturer;

  @OneToMany(type => Owner, owner => owner.car, { nullable: true, eager: true })
  owners: Owner[];
}