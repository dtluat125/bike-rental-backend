// src/dock/dock.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DocksService } from './docks.service';
import { CreateDockDto } from './dto/create-dock.dto';
import { UpdateDockDto } from './dto/update-dock.dto';

@Controller({
  path: 'docks',
  version: '1',
})
export class DocksController {
  constructor(private readonly dockService: DocksService) {}

  @Get()
  async getAllDocks() {
    return this.dockService.findAll();
  }

  @Get(':id')
  async getDockDetail(@Param('id') id: number) {
    return this.dockService.getDockDetail(id);
  }

  @Post()
  async createDock(@Body() createDockDto: CreateDockDto) {
    return this.dockService.create(createDockDto);
  }

  @Put(':id')
  async updateDock(
    @Param('id') id: number,
    @Body() updateDockDto: UpdateDockDto,
  ) {
    return this.dockService.update(id, updateDockDto);
  }

  @Delete(':id')
  async deleteDock(@Param('id') id: number) {
    return this.dockService.delete(id);
  }
}
