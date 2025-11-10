import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtGuard } from 'src/http/guards/jwt.guard';
import { CurrentUser } from 'src/http/decorators/current-user.decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  async getMe(@CurrentUser('id') id: string) {
    return await this.userService.getMe(id);
  }

  @Post()
  async create(@Body() body: CreateUserDTO) {
    await this.userService.create(body);
  }
}
