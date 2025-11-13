import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './dto/customer.dto';
import { GetManyQuery } from './query/get-many.query';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getMany(@Query() q: GetManyQuery) {
    return await this.customerService.getMany(q);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.customerService.getOne(id);
  }

  @Post()
  async create(@Body() body: CustomerDTO) {
    return await this.customerService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: CustomerDTO) {
    return await this.customerService.update(id, body);
  }
}
