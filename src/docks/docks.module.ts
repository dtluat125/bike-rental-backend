import { Module } from '@nestjs/common';
import { DocksService } from './docks.service';
import { DocksController } from './docks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dock } from 'src/docks/entities/dock.entity';
import { BikeService } from 'src/bike/bike.service';
import { Bike } from 'src/bike/entities/bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dock, Bike])],
  providers: [DocksService, BikeService],
  controllers: [DocksController],
})
export class DocksModule {}
