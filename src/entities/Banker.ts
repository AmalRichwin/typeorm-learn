import { Person } from './utils/Person';
import { BaseEntity, Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('banker')
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  employee_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
