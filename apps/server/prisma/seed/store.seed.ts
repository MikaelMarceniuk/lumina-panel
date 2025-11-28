import { PrismaClient } from 'generated/prisma/client';
import { faker } from '@faker-js/faker';

export const storeSeed = async (ctx: PrismaClient) => {
  console.log('🌱 Seeding stores...');

  const storesData = Array.from({ length: 10 }).map(() => ({
    name: faker.company.name(),
    manager: faker.person.fullName(),
    contactEmail: faker.internet.email(),
    address: faker.location.streetAddress(),
    addressComplement: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####-###'),
  }));

  await ctx.store.createMany({
    data: storesData,
  });

  console.log('✅ Stores seeded');
};
