import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Bike } from '../bike/entities/bike.entity';
import { BikeService } from '../bike/bike.service';
import { PricingsService } from 'src/pricings/pricings.service';
import { Pricing } from '../pricings/entities/pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Bike, Pricing])],
  controllers: [RentalsController],
  providers: [RentalsService, BikeService, PricingsService],
})
export class RentalsModule {}
