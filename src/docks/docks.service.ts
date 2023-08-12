// src/dock/dock.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dock } from './entities/dock.entity';
import { UpdateDockDto } from './dto/update-dock.dto';
import { CreateDockDto } from './dto/create-dock.dto';

@Injectable()
export class DocksService {
  constructor(
    @InjectRepository(Dock)
    private dockRepository: Repository<Dock>,
  ) {}

  async findAll(): Promise<Dock[]> {
    return this.dockRepository.find();
  }

  async getDockDetail(id: number): Promise<Dock> {
    const dock = await this.dockRepository.findOne({
      where: { id },
      relations: ['bikes'],
    });
    if (!dock) {
      throw new NotFoundException(`Dock with ID ${id} not found`);
    }
    return dock;
  }

  async create(createDockDto: CreateDockDto): Promise<Dock> {
    const dock = this.dockRepository.create(createDockDto);
    return this.dockRepository.save(dock);
  }

  async update(id: number, updateDockDto: UpdateDockDto): Promise<Dock> {
    const dock = await this.getDockDetail(id);
    Object.assign(dock, updateDockDto);
    return this.dockRepository.save(dock);
  }

  async delete(id: number): Promise<void> {
    const dock = await this.getDockDetail(id);
    await this.dockRepository.remove(dock);
  }
}
