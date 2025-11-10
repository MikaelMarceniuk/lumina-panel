import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './http/resources/app/app.controller';
import { AppService } from './http/resources/app/app.service';
import { AuthModule } from './http/resources/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { envSchema } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error('❌ Erro ao validar variáveis de ambiente:');
          console.error(parsed.error);
          process.exit(1);
        }
        return parsed.data;
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', { infer: true }),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
