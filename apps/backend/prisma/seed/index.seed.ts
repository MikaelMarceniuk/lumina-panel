import { PrismaClient } from 'generated/prisma/client';
import { userSeed } from './user.seed';
import { customerSeed } from './customer.seed';
import { productSeed } from './product.seed';
import { categorySeed } from './category.seed';
import { ordersSeed } from './orders.seed';

const prisma = new PrismaClient();

const runSeed = async () => {
  try {
    await prisma.$connect();
    await userSeed(prisma);
    await customerSeed(prisma);
    await categorySeed(prisma);
    await productSeed(prisma);
    await ordersSeed(prisma);
  } catch (err) {
    console.log('runSeed.error: ', err);
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();
