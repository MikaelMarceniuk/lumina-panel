import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDTO } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async createSession(dto: CreateSessionDTO) {
    return this.prisma.$transaction(async (ctx) => {
      await ctx.session.updateMany({
        where: {
          userId: dto.userId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });

      const session = await ctx.session.create({
        data: {
          userId: dto.userId,
          refreshToken: dto.refreshToken,
          accessToken: dto.accessToken,
          expiresAt: new Date(dto.expiresAt),
          isActive: true,
        },
      });

      return session;
    });
  }
}
