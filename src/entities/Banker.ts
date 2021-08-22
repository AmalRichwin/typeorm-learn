import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('banker')
export class Banker extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: number;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    unique: true,
    length: 10,
  })
  employee_id: string;

  @Column({
    type: 'numeric',
  })
  balance: number;

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
