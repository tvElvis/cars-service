import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
