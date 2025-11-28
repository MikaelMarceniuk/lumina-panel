import { PrismaClient } from 'generated/prisma/client';
import { userSeed } from './user.seed';
import { storeSeed } from './store.seed';

const prisma = new PrismaClient();

const runSeed = async () => {
  try {
    await prisma.$connect();
    await userSeed(prisma);
    await storeSeed(prisma);
  } catch (err) {
    console.log('runSeed.error: ', err);
  } finally {
    await prisma.$disconnect();
  }
};

runSeed();
