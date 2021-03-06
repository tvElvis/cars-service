import { Entity, CreateDateColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../shared/entities/base.entity";
import { Car } from "../car/car.entity";

@Entity('manufacturer')
export class Manufacturer extends BaseEntity {
  @Column({ length: 60 })
  name: string;

  @Column()
  phone: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  siret: number;

  @OneToMany(type => Car, car => car.manufacturer, { nullable: true })
  cars: Car[];

}