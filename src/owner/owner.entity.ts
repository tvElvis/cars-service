import { Entity, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from '../shared/entities/base.entity';
import { Car } from '../car/car.entity';

@Entity('owner')
export class Owner extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  purchaseDate: Date;

  @Column({ length: 60 })
  name: string;

  @OneToOne(type => Car, { onDelete: 'CASCADE' })
  @JoinColumn()
  car: Car;
}
