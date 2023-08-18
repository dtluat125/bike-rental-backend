// src/dock/dock.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BikeService } from 'src/bike/bike.service';
import { Repository } from 'typeorm';
import { CreateDockDto } from './dto/create-dock.dto';
import { UpdateDockDto } from './dto/update-dock.dto';
import { Dock } from './entities/dock.entity';

@Injectable()
export class DocksService {
  constructor(
    @InjectRepository(Dock)
    private dockRepository: Repository<Dock>,
    private bikeService: BikeService,
  ) {}

  async findAll(): Promise<Dock[]> {
    const response = await this.dockRepository
      .createQueryBuilder('dock')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(bike.id)')
          .from('bike', 'bike')
          .where('bike.dockId = dock.id');
      }, 'dock_bikeCount')
      .getRawMany();

    response.forEach((raw) => {
      Object.keys(raw).forEach((snakeCasedKey) => {
        raw[snakeCasedKey.split('_')[1]] = raw[snakeCasedKey];
        delete raw[snakeCasedKey];
      });
      Object.assign(raw, { bikeCount: Number((raw as any).bikeCount) });
    });

    console.log(response);
    return response;
  }

  async getDockContainsBike(bikeId: number): Promise<Dock> {
    console.log('Start finding dock contains bike: ', bikeId);
    const dock = await this.dockRepository
      .createQueryBuilder('dock')
      .innerJoinAndSelect('dock.bikes', 'bike')
      .where('bike.id = :bikeId', { bikeId })
      .getOne();
    return dock as any;
  }

  async getDockDetail(id: number): Promise<Dock> {
    const dock = await this.dockRepository.findOne({
      where: { id },
      relations: ['bikes'],
    });
    if (!dock) {
      throw new NotFoundException(`Dock with ID ${id} not found`);
    }
    const remainingPoints = (dock.totalPoints || 0) - dock.bikes.length;
    Object.assign(dock, {
      numBikes: dock.bikes.length,
      remainingPoints: remainingPoints < 0 ? 0 : remainingPoints,
    });
    return dock;
  }

  async create(createDockDto: CreateDockDto): Promise<Dock> {
    if (createDockDto.bikes?.length > (createDockDto.totalPoints || 0))
      throw new BadRequestException(
        'Number of bikes must not exceed total points',
      );
    const dock = this.dockRepository.create(createDockDto);
    return this.dockRepository.save(dock);
  }

  async update(id: number, updateDockDto: UpdateDockDto): Promise<Dock> {
    const dock = await this.getDockDetail(id);
    if (updateDockDto.bikes?.length > (dock.totalPoints || 0))
      throw new BadRequestException(
        'Number of bikes must not exceed total points',
      );
    const bikes = await Promise.all(
      updateDockDto.bikes.map((id) => this.bikeService.getBikeDetail(id)),
    );
    updateDockDto.bikes = bikes as any;
    Object.assign(dock, updateDockDto);
    console.log(dock);
    return this.dockRepository.save(dock);
  }

  async delete(id: number): Promise<void> {
    const dock = await this.getDockDetail(id);
    await this.dockRepository.remove(dock);
  }
}
