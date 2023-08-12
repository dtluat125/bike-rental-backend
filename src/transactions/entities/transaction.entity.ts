import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Transaction extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rentedBikeId: number;

  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'rentedBikeId' })
  rentedBike: Bike;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  rentalDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column()
  rentalPrice: number;

  // ... other properties if needed
}
