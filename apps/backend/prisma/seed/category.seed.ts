import { faker } from '@faker-js/faker';
import { PrismaClient } from 'generated/prisma/client';

export const categorySeed = async (ctx: PrismaClient) => {
  console.log('🌱 Seeding categories...');

  const categories = Array.from({ length: 10 }).map(() => {
    const name = faker.commerce.department();
    return {
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
    };
  });

  await ctx.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log('✅ Categories seeded');
};
