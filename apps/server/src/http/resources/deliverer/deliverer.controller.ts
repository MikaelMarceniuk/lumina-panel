import { Controller, Query } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateDelivererDto } from './dto/create-deliverer.dto';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';
import { UpdateDelivererActiveDto } from './dto/update-deliverer-active.dto';
import { GetAllQuery } from './query/get-all.query';

@Controller('deliverer')
export class DelivererController {
  constructor(private readonly delivererService: DelivererService) {}

  @Get()
  getAll(@Query() q: GetAllQuery) {
    return this.delivererService.getAll(q);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.delivererService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateDelivererDto) {
    return this.delivererService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDelivererDto) {
    return this.delivererService.update(id, dto);
  }

  @Patch(':id/active')
  updateActive(@Param('id') id: string, @Body() dto: UpdateDelivererActiveDto) {
    return this.delivererService.updateActive(id, dto.isActive);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.delivererService.remove(id);
  }
}
