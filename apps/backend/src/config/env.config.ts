import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url({ message: 'DATABASE_URL deve ser uma URL válida' }),
  JWT_SECRET: z
    .string()
    .min(10, 'JWT_SECRET deve ter pelo menos 10 caracteres'),
});

export type Env = z.infer<typeof envSchema>;
