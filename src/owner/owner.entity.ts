import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../shared/entities/base.entity';
import { Car } from '../car/car.entity';

@Entity('owner')
export class Owner extends BaseEntity {
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  purchaseDate: Date;

  @Column({ length: 60 })
  name: string;

  @ManyToOne(type => Car, car => car.owners, { nullable: true, onDelete: 'CASCADE' })
  car: Car;
}
