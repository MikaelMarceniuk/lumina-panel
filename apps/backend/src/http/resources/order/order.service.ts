import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { GetManyQuery } from './query/get-many.query';
import { OrderPaginated } from './presenter/order-paginated.presenter';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany({ q, page = 1, limit = 10 }: GetManyQuery) {
    const where: Prisma.OrderWhereInput = {
      ...(q && { orderCode: { contains: q, mode: 'insensitive' } }),
    };

    const [orders, totalCount] = await Promise.all([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where,
      }),
      this.prisma.order.count({}),
    ]);

    return new OrderPaginated({ orders, totalCount, page, limit });
  }
}
