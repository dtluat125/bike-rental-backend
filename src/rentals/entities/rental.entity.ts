import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Bike } from '../../bike/entities/bike.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Rental extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'bikeId' })
  bike: Bike;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  rentalDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ default: 0 })
  amountPaid: number;

  // ... other properties if needed
}
