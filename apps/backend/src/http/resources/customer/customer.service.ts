import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerPresenter } from './presenter/customer.presenter';
import { GetManyQuery } from './query/get-many.query';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany(filters: GetManyQuery) {
    const { q, company } = filters;

    const customers = await this.prisma.customer.findMany({
      where: {
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
      },
    });

    return customers.map((c) => new CustomerPresenter(c));
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
