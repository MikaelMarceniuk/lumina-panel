import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { GetManyQuery } from './query/get-many.query';
import { ProductPaginated } from './presenter/product-paginated.presenter';
import { CreateProductDTO } from './dto/create-product.dto';
import { slugify } from 'src/utils/slugify.util';
import { ProductPresenter } from './presenter/product.presenter';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany({ page, limit }: GetManyQuery) {
    const [products, totalCount] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count(),
    ]);

    return new ProductPaginated({ products, page, limit, totalCount });
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
                connect: p.categories.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: { categories: true },
    });

    return new ProductPresenter(product);
  }
}
