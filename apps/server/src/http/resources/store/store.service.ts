import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { GetAllQuery } from './query/get-all.query';
import { StorePaginated } from './presenter/store-paginated.presenter';
import { StoreDetailsPresenter } from './presenter/store-details.presenter';
import { CreateStoreDTO } from './dto/create-store.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll({ limit = 10, page = 1, q }: GetAllQuery) {
    const take = limit;
    const skip = (page - 1) * limit;

    const where: Prisma.StoreWhereInput = {};
    if (q && q.trim() !== '') {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { manager: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [totalCount, stores] = await Promise.all([
      this.prisma.store.count({ where }),
      this.prisma.store.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return new StorePaginated({
      pagination: { limit, page, totalCount },
      stores,
    });
  }

  async getOne(id: string): Promise<StoreDetailsPresenter> {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException(`Loja com id "${id}" não encontrado!`);
    }

    return new StoreDetailsPresenter(store);
  }

  async create(data: CreateStoreDTO): Promise<StoreDetailsPresenter> {
    if (data.contactEmail) {
      const existingStore = await this.prisma.store.findUnique({
        where: { contactEmail: data.contactEmail },
      });

      if (existingStore) {
        throw new ConflictException('Email já está em uso');
      }
    }

    const store = await this.prisma.store.create({
      data: {
        name: data.name,
        manager: data.manager,
        phone: data.phone,
        contactEmail: data.contactEmail,
        address: data.address,
        addressComplement: data.addressComplement,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
    });

    return new StoreDetailsPresenter(store);
  }

  async update(
    id: string,
    data: UpdateStoreDTO,
  ): Promise<StoreDetailsPresenter> {
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }

    if (data.contactEmail && data.contactEmail !== store.contactEmail) {
      const existingStore = await this.prisma.store.findUnique({
        where: { contactEmail: data.contactEmail },
      });

      if (existingStore) {
        throw new ConflictException('Email já está em uso');
      }
    }

    const updatedStore = await this.prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        manager: data.manager,
        phone: data.phone,
        contactEmail: data.contactEmail,
        address: data.address,
        addressComplement: data.addressComplement,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
    });

    return new StoreDetailsPresenter(updatedStore);
  }

  async delete(id: string): Promise<void> {
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      throw new NotFoundException(`Loja com id "${id}" não encontrado!`);
    }

    await this.prisma.store.delete({ where: { id } });
  }
}
