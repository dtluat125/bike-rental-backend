import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Bike } from '../bike/entities/bike.entity';
import { BikeService } from '../bike/bike.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Bike])],
  controllers: [RentalsController],
  providers: [RentalsService, BikeService],
})
export class RentalsModule {}
