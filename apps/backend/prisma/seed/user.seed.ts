import bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma/client';

export const userSeed = async (ctx: PrismaClient) => {
  const email = 'admin@lumina.dev';
  const password = '12345678';
  const password_hash = await bcrypt.hash(password, 10);

  const adminUser = await ctx.user.findFirst({
    where: { email },
  });

  if (adminUser) return;

  await ctx.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin',
      password_hash,
    },
  });

  console.log('✅ Admin user seeded');
};
