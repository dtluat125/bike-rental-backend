import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Bike[]> {
    return this.bikeRepository.find();
  }

  async getBikeDetail(id: number): Promise<Bike> {
    const bike = await this.bikeRepository.findOneBy({ id });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return bike;
  }

  async create(createBikeDto: Partial<Bike>): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto);
    return this.bikeRepository.save(bike);
  }

  async update(id: number, updateBikeDto: Partial<Bike>): Promise<Bike> {
    const bike = await this.getBikeDetail(id);
    Object.assign(bike, updateBikeDto);
    return this.bikeRepository.save(bike);
  }

  async delete(id: number): Promise<void> {
    const bike = await this.getBikeDetail(id);
    await this.bikeRepository.remove(bike);
  }
}
