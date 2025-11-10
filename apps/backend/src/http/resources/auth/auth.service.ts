import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInPresenter } from './presenters/sign-in.presenter';
import { UserPresenter } from '../user/presenters/user.presenter';
import { SessionService } from 'src/providers/session/session.service';
import { RefreshPresenter } from './presenters/refresh.presenter';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async signIn({ email, password }: SignInDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      user.password_hash,
    );
    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

    await this.sessionService.createSession({
      accessToken,
      refreshToken,
      expiresAt: refreshTokenExpiresAt,
      userId: user.id,
    });

    return new SignInPresenter({
      user: new UserPresenter(user),
      accessToken,
      refreshToken,
    });
  }

  async refreshToken(refreshToken: string) {
    const session = await this.prisma.session.findFirst({
      where: { refreshToken, isActive: true },
      include: { user: true },
    });

    if (!session) throw new UnauthorizedException('Refresh token inválido');

    if (session.expiresAt && session.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expirado');
    }

    const accessToken = this.jwtService.sign(
      { sub: session.user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );

    await this.prisma.session.update({
      data: { accessToken },
      where: { id: session.id },
    });

    return new RefreshPresenter({ accessToken });
  }
}
