import { PrismaClient } from 'generated/prisma/client';
import { userSeed } from './user.seed';
import { customerSeed } from './customer.seed';
import { productSeed } from './product.seed';

const prisma = new PrismaClient();

const runSeed = async () => {
  try {
    await prisma.$connect();
    await userSeed(prisma);
    await customerSeed(prisma);
    await productSeed(prisma);
  } catch (err) {
    console.log('runSeed.error: ', err);
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();
