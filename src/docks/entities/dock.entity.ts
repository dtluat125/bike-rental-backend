import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Dock extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  walkingDistance: number;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Bike, (bike) => bike.dock)
  @JoinColumn()
  bikes: Bike[];

  @Column({ nullable: true })
  dockArea: string;

  @Column({ nullable: true })
  totalPoints: number;
  // ... other properties if needed
}
