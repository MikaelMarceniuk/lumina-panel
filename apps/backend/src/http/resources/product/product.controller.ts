import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetManyQuery } from './query/get-many.query';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getMany(@Query() q: GetManyQuery) {
    return await this.productService.getMany(q);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.productService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateProductDTO) {
    return await this.productService.create(body);
  }

  @Put(':id/is_active')
  async toggleActive(@Param('id') id: string) {
    return await this.productService.toggleActive(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return await this.productService.update(id, body);
  }
}
