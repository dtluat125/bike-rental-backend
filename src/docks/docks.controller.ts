// src/dock/dock.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DocksService } from './docks.service';
import { Dock } from 'src/docks/entities/dock.entity';

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
  async createDock(@Body() createDockDto: Partial<Dock>) {
    return this.dockService.create(createDockDto);
  }

  @Put(':id')
  async updateDock(
    @Param('id') id: number,
    @Body() updateDockDto: Partial<Dock>,
  ) {
    return this.dockService.update(id, updateDockDto);
  }

  @Delete(':id')
  async deleteDock(@Param('id') id: number) {
    return this.dockService.delete(id);
  }
}
