import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { GetAllQuery } from './query/get-all.query';
import { CreateStoreDTO } from './dto/create-store.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getAll(@Query() q: GetAllQuery) {
    return this.storeService.getAll(q);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.storeService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateStoreDTO) {
    return await this.storeService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateStoreDTO) {
    return this.storeService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.storeService.delete(id);
  }
}
