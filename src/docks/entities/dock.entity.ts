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

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  image: string;

  @OneToMany(() => Bike, (bike) => bike.dock)
  @JoinColumn()
  bikes: Bike[];

  // ... other properties if needed
}
