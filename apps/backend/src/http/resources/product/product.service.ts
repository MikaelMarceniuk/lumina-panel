import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { GetManyQuery } from './query/get-many.query';
import { ProductPaginated } from './presenter/product-paginated.presenter';
import { CreateProductDTO } from './dto/create-product.dto';
import { slugify } from 'src/utils/slugify.util';
import { ProductPresenter } from './presenter/product.presenter';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { Prisma } from 'generated/prisma/client';
import { ProductDetailsPresenter } from './presenter/product-details.presenter';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany({ q, status, page = 1, limit = 10 }: GetManyQuery) {
    const where: Prisma.ProductWhereInput = {
      ...(status !== undefined && { isActive: status }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { sku: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const [products, totalCount] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where,
      }),
      this.prisma.product.count({ where }),
    ]);

    return new ProductPaginated({ products, page, limit, totalCount });
  }

  async getOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return new ProductDetailsPresenter(product);
  }

  async create(p: CreateProductDTO) {
    const slug = slugify(p.name);

    const productBySlugOrSku = await this.prisma.product.findFirst({
      where: {
        OR: [{ slug }, { sku: p.sku }],
      },
    });

    if (productBySlugOrSku) {
      throw new BadRequestException('Produto com mesmo slug ou SKU já existe');
    }

    const product = await this.prisma.product.create({
      data: {
        name: p.name,
        slug,
        sku: p.sku,
        description: p.description,
        priceInCents: p.priceInCents,
        stock: p.stock ?? 0,
        isActive: p.isActive ?? true,
        ...(p.categories?.length
          ? {
              categories: {
                connect: p.categories.map(({ id }) => ({ id })),
              },
            }
          : {}),
      },
      include: { categories: true },
    });

    return new ProductPresenter(product);
  }

  async toggleActive(id: string) {
    try {
      const updated = await this.prisma.product.update({
        where: { id },
        data: {
          isActive: {
            set: !(
              await this.prisma.product.findUnique({
                where: { id },
                select: { isActive: true },
              })
            )?.isActive,
          },
        },
      });

      return new ProductPresenter(updated);
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error(`Produto nao encontrado`);
      }
      throw error;
    }
  }
}
