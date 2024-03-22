import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/Dto/user/create.user.dto';
import { ResponseObject } from 'src/messages/message';
import { User } from 'src/db/schemas/user.schema';
import { UpdateUserDto } from 'src/Dto/user/update.user.dto';
import { ParseEmailPipe } from 'src/pipes/parse-email/parse-email.pipe';
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @Header('Cache-Control', 'none')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async findUserByID(@Param('id') id: string): Promise<ResponseObject<User>> {
    const data = await this.usersService.findUserByID(id);
    if (data)
      return new ResponseObject(
        'success',
        200,
        'User found successfully',
        data,
      );
    return new ResponseObject('not-found', 404, 'User not found', undefined);
  }

  @Get('email/:email')
  async findUserByEmail(
    @Param('email', new ParseEmailPipe()) email: string,
  ): Promise<ResponseObject<User>> {
    const data = await this.usersService.findUserByEmail(email);
    if (data)
      return new ResponseObject(
        'success',
        200,
        'User found successfully',
        data,
      );
    return new ResponseObject('not-found', 404, 'User not found', undefined);
  }

  @Get('phone/:phoneNumber')
  async findUserByPhoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
  ): Promise<ResponseObject<User>> {
    const data = await this.usersService.findUserByPhoneNumber(phoneNumber);
    if (data)
      return new ResponseObject(
        'success',
        200,
        'User found successfully',
        data,
      );
    return new ResponseObject('not-found', 404, 'User not found', undefined);
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('role') role: string,
  ): Promise<ResponseObject<User[]>> {
    const data = await this.usersService.findAll(limit, role);
    if (data)
      return new ResponseObject(
        'success',
        200,
        'Users found successfully',
        data,
      );
    return new ResponseObject('not-founds', 404, 'Users not founds', undefined);
  }

  @Put(':id')
  @Header('Cache-Control', 'none')
  @HttpCode(201) // Set the HTTP status code to 201 (Created)
  async updateUserByID(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<User>> {
    const updatedUser = await this.usersService.updateUserByID(
      id,
      updateUserDto,
    );
    return new ResponseObject(
      'updates',
      201,
      'User updated successfully',
      updatedUser,
    );
  }

  @Delete(':id')
  async deleteUserByID(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUserByID(id);
  }
}
