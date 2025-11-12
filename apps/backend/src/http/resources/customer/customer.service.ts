import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerPresenter } from './presenter/customer.presenter';
import { GetManyQuery } from './query/get-many.query';
import { Prisma } from 'generated/prisma/browser';
import { CustomerPaginated } from './presenter/customer-paginated.presenter';
import { CustomerDetailsPresenter } from './presenter/customer-details.presenter';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(filters: GetManyQuery) {
    const { q, company, limit = 10, page = 1 } = filters;

    const where: Prisma.CustomerWhereInput = {
      AND: [
        company && company !== 'all'
          ? { companyName: { contains: company, mode: 'insensitive' } }
          : {},
        q
          ? {
              OR: [
                { email: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const [customers, totalCount] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return new CustomerPaginated({
      customers,
      limit,
      page,
      totalCount,
    });
  }

  async getOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não foi encontrado.');
    }

    return new CustomerDetailsPresenter(customer);
  }

  async create(dto: CreateCustomerDTO) {
    const email = dto.email.toLowerCase().trim();
    const document = dto.document?.replace(/\D/g, '');
    const zipCode = dto.zipCode?.replace(/\D/g, '');

    const existingCustomer = await this.prisma.customer.findFirst({
      where: {
        OR: [{ email }, ...(document ? [{ document }] : [])],
      },
    });

    if (existingCustomer) {
      if (existingCustomer.email === email) {
        throw new ConflictException('Já existe um cliente com este e-mail.');
      }
      if (document && existingCustomer.document === document) {
        throw new ConflictException('Já existe um cliente com este documento.');
      }
    }

    const customer = await this.prisma.customer.create({
      data: {
        name: dto.name.trim(),
        email,
        phone: dto.phone?.trim(),
        document,
        companyName: dto.companyName?.trim(),
        address: dto.address?.trim(),
        complement: dto.complement?.trim(),
        city: dto.city?.trim(),
        state: dto.state?.trim().toUpperCase(),
        zipCode,
      },
    });

    return new CustomerPresenter(customer);
  }
}
