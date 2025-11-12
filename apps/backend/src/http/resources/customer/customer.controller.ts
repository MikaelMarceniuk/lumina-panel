import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post()
  async create(@Body() body: CreateCustomerDTO) {
    return await this.customerService.create(body);
  }
}
