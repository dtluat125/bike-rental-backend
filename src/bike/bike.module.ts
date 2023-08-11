import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from 'src/bike/entities/bike.entity';
import { BikeController } from './bike.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bike])],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
