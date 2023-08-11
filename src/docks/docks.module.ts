import { Module } from '@nestjs/common';
import { DocksService } from './docks.service';
import { DocksController } from './docks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dock } from 'src/docks/entities/dock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dock])],
  providers: [DocksService],
  controllers: [DocksController],
})
export class DocksModule {}
