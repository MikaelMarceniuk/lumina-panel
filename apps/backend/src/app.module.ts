import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './http/resources/app/app.controller';
import { AppService } from './http/resources/app/app.service';
import { AuthModule } from './http/resources/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
