import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetManyQuery } from './query/get-many.query';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getMany(@Query() q: GetManyQuery) {
    return await this.orderService.getMany(q);
  }
}
