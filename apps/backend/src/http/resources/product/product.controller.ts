import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetManyQuery } from './query/get-many.query';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getMany(@Query() q: GetManyQuery) {
    return await this.productService.getMany(q);
  }

  @Post()
  async create(@Body() body: CreateProductDTO) {
    return await this.productService.create(body);
  }
}
