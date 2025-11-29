import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDelivererDto } from './dto/create-deliverer.dto';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { DelivererPresenter } from './presenters/deliverer.presenter';
import { DelivererDetailsPresenter } from './presenters/deliverer-details.presente';
import { GetAllQuery } from './query/get-all.query';
import { DelivererPaginatedPresenter } from './presenters/deliverer-paginated.presenter';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class DelivererService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll({ limit = 10, page = 1, q }: GetAllQuery) {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const where: Prisma.DelivererWhereInput = q
      ? {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        }
      : {};

    const [totalCount, deliverers] = await this.prisma.$transaction([
      this.prisma.deliverer.count({ where }),
      this.prisma.deliverer.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return new DelivererPaginatedPresenter({
      deliverers,
      pagination: {
        limit,
        page,
        totalCount,
      },
    });
  }

  async getOne(id: string) {
    const deliverer = await this.prisma.deliverer.findUnique({ where: { id } });

    if (!deliverer) {
      throw new NotFoundException(`Deliverer ${id} not found`);
    }

    return new DelivererDetailsPresenter(deliverer);
  }

  async create(data: CreateDelivererDto) {
    const deliverer = await this.prisma.deliverer.create({ data });
    return new DelivererPresenter(deliverer);
  }

  async update(id: string, data: UpdateDelivererDto) {
    await this.getOne(id);

    const updatedDeliverer = await this.prisma.deliverer.update({
      where: { id },
      data,
    });

    return new DelivererDetailsPresenter(updatedDeliverer);
  }

  async updateActive(id: string, isActive: boolean) {
    await this.getOne(id);

    const updatedDeliverer = await this.prisma.deliverer.update({
      where: { id },
      data: { isActive },
    });

    return new DelivererDetailsPresenter(updatedDeliverer);
  }

  async remove(id: string) {
    await this.getOne(id);
    return this.prisma.deliverer.delete({ where: { id } });
  }
}
