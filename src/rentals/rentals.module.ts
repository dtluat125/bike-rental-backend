import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { Bike } from '../bike/entities/bike.entity';
import { BikeService } from '../bike/bike.service';
import { PricingsService } from 'src/pricings/pricings.service';
import { Pricing } from '../pricings/entities/pricing.entity';
import { DocksService } from '../docks/docks.service';
import { Dock } from '../docks/entities/dock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Bike, Pricing, Dock])],
  controllers: [RentalsController],
  providers: [RentalsService, BikeService, PricingsService, DocksService],
})
export class RentalsModule {}
