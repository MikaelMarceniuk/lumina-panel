import { Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(data: SignInDTO) {
    const user = await this.prisma.user.findMany();
    console.log('users: ', user);
  }
}
