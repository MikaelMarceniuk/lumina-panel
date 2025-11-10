import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UserPresenter } from './presenters/user.presenter';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return new UserPresenter(user);
  }

  async create({ name, email, password }: CreateUserDTO) {
    const userByEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userByEmail) {
      throw new Error('Usuario ja existente com email informado');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(
      password,
      await bcrypt.genSalt(saltRounds),
    );

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password_hash: passwordHash,
      },
    });

    return new UserPresenter(user);
  }
}
