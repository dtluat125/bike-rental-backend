// src/bike/bike.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Dock } from '../../docks/entities/dock.entity';

@Entity()
export class Bike extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  barcode: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  image: string;

  @Column()
  licensePlate: string;

  @Column()
  battery: number;

  @Column()
  rentingPrice: number;

  @ManyToOne(() => Dock, dock => dock.bikes)
  @JoinColumn({ name: 'dockId' })
  dock: Dock;
}
