import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
