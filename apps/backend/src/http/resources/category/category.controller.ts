import { Body, Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetManyQuery } from './query/get-many.query';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getMany(@Query() q: GetManyQuery) {
    return await this.categoryService.getMany(q);
  }
}
