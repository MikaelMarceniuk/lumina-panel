import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInPresenter } from './presenters/sign-in.presenter';
import { UserPresenter } from '../user/presenters/user.presenter';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
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

    return new SignInPresenter({
      user: new UserPresenter(user),
      accessToken,
      refreshToken,
    });
  }
}
