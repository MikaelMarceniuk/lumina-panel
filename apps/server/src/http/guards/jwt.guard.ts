import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/providers/session/session.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { accessToken } = request.cookies as { accessToken?: string };

    if (!accessToken) {
      throw new UnauthorizedException('Token de acesso ausente');
    }

    try {
      this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (_err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const session = await this.prisma.session.findFirst({
      where: { accessToken },
      include: { user: true },
    });

    if (!session || !session.isActive) {
      throw new UnauthorizedException('Sessão inválida ou expirada');
    }

    if (session.expiresAt && session.expiresAt < new Date()) {
      await this.sessionService.desactivateSession(session.id);
      throw new ForbiddenException('Sessão expirada');
    }

    request['user'] = session.user;

    return true;
  }
}
