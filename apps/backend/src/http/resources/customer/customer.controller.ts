import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
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
  async create(@Body() body: CreateCustomerDTO) {
    return await this.customerService.create(body);
  }
}
