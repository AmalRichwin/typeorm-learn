import { Person } from './utils/Person';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('client')
export class Client extends Person {
  @Column({
    default: true,
    name: 'active',
  })
  is_active: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: number;
    gender: string;
    account_type: string;
  };

  @Column({
    type: 'simple-array',
    default: [],
  })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
