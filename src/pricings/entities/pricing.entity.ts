import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Pricing extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  description: string;

  @Column()
  basePrice: number; // VND

  @Column()
  additionalPrice: number; // VND

  @Column()
  timeThreshold: number; // Time threshold in minutes

  @Column({ nullable: true })
  freeThreshold: number; // Time threshold in minutes

  @Column()
  lateFee: number; // Late fee in VND

  @Column()
  refundRate: number; // Refund rate as a decimal

  @Column()
  refundThreshold: number; // Refund threshold in hours

  // ... other properties if needed
}
