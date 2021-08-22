import { Transaction } from './Transaction';
import { Person } from './utils/Person';
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, UpdateDateColumn } from 'typeorm';
import { Banker } from './Banker';

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

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
