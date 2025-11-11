import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getMany() {
    return await this.customerService.getMany();
  }

  @Post()
  async create(@Body() body: CreateCustomerDTO) {
    return await this.customerService.create(body);
  }
}
