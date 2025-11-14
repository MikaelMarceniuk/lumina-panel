import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CategoryPresenter } from './presenters/category.presenter';
import { GetManyQuery } from './query/get-many.query';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany({ q }: GetManyQuery) {
    const categories = await this.prisma.category.findMany({
      where: q
        ? {
            name: {
              contains: q,
              mode: 'insensitive',
            },
          }
        : undefined,
    });

    return categories.map((c) => new CategoryPresenter(c));
  }
}
