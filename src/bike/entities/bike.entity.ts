// src/bike/bike.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Dock } from '../../docks/entities/dock.entity';
import { BikeStatus, BikeType } from 'src/bike/constants';

@Entity()
export class Bike extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  barcode: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BikeType,
    default: BikeType.STANDARD,
  })
  type: BikeType;

  @Column({ nullable: true })
  image: string;

  @Column()
  licensePlate: string;

  @Column()
  battery: number;

  @Column()
  rentingPrice: number;

  @Column({
    type: 'enum',
    enum: BikeStatus,
    default: BikeStatus.FREE,
  })
  status: BikeStatus;

  @ManyToOne(() => Dock, (dock) => dock.bikes, { cascade: true })
  @JoinColumn({ name: 'dockId' })
  dock: Dock;
}
