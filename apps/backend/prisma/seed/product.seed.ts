import { PrismaClient } from 'generated/prisma/client';
import { faker } from '@faker-js/faker';

export const productSeed = async (prisma: PrismaClient) => {
  console.log('🌱 Seeding products...');

  const products = Array.from({ length: 50 }).map(() => {
    const name = faker.commerce.productName();
    const slug = faker.helpers.slugify(name).toLowerCase();
    const sku = faker.string.alphanumeric(10).toUpperCase();

    return {
      name,
      slug,
      sku,
      description: faker.commerce.productDescription(),
      priceInCents: faker.number.int({ min: 1000, max: 50000 }), // R$10 a R$500
      stock: faker.number.int({ min: 0, max: 200 }),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: new Date(),
    };
  });

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true, // evita erro se já existir slug/SKU igual
  });

  console.log('✅ 50 products seeded');
};
