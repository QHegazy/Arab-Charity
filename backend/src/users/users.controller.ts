import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/Dto/create.user.dto';
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private UsersServices: UsersService) {}
  @Get()
  async users() {
    return await this.UsersServices.findAll();
  }
  @Post()
  async createUser(@Body() CreateUser: CreateUserDto) {
    return await this.UsersServices.createUser(CreateUser);
  }
}
