// src/bike/bike.controller.ts

import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { BikeService } from './bike.service';
import { Bike } from './entities/bike.entity';

@Controller({
  path: 'bikes',
  version: '1',
})
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Post()
  create(@Body() bikeData: Partial<Bike>): Promise<Bike> {
    return this.bikeService.create(bikeData);
  }

  @Get()
  findAll(): Promise<Bike[]> {
    return this.bikeService.findAll();
  }

  @Get(':id')
  async getBikeDetail(@Param('id') id: number) {
    return this.bikeService.getBikeDetail(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Bike>): Promise<Bike> {
    return this.bikeService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.bikeService.delete(id);
  }
}