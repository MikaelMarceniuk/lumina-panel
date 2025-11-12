import { faker } from '@faker-js/faker';
import { PrismaClient } from 'generated/prisma/client';

function fakeBrazilianPhone(): string {
  const firstDigit = '9';
  const rest = faker.string.numeric(8);
  return `${16}${firstDigit}${rest}`;
}

export const customerSeed = async (ctx: PrismaClient) => {
  console.log('🌱 Seeding customers...');

  const customers = Array.from({ length: 50 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: fakeBrazilianPhone(),
    document: faker.string.numeric(11),
    companyName: faker.company.name(),
    address: faker.location.streetAddress(),
    complement: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####-###'),
  }));

  await ctx.customer.createMany({
    data: customers,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${customers.length} customers.`);
};
