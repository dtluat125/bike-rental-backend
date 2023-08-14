import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { getDeposit } from '../rentals/utils';

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
    const bike = await this.bikeRepository.findOne({
      where: { id },
      relations: ['dock'],
    });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return { ...bike, deposit: getDeposit(bike.type) } as any;
  }

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    console.log(createBikeDto);
    const bike = this.bikeRepository.create(createBikeDto as unknown as Bike);
    return this.bikeRepository.save(bike);
  }

  async update(id: number, updateBikeDto: UpdateBikeDto): Promise<Bike> {
    console.log(updateBikeDto);
    const bike = await this.getBikeDetail(id);
    Object.assign(bike, updateBikeDto);
    return this.bikeRepository.save(bike);
  }

  async delete(id: number): Promise<void> {
    const bike = await this.getBikeDetail(id);
    await this.bikeRepository.remove(bike);
  }
}
