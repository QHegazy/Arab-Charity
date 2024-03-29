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
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.createUser(createUserDto);
      if (user) {
        return new ResponseObject('success', 200, 'User created successfully');
      }
      return new ResponseObject('error', 404, 'User not  created', undefined);
    } catch (error) {
      throw error;
    }
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
  @HttpCode(201)
  async updateUserByID(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedUser = await this.usersService.updateUserByID(
        id,
        updateUserDto,
      );
      if (updatedUser) {
        return new ResponseObject(
          'success',
          201,
          'User updated successfully',
          updatedUser,
        );
      }
      return new ResponseObject('not-found', 404, 'User not found', undefined);
    } catch (error) {
      throw error;
    }
  }
  @Put('email/:email')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async updateUserByEmail(
    @Param('email', new ParseEmailPipe()) email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedUser = await this.usersService.updateUserByEmail(
        email,
        updateUserDto,
      );
      if (updatedUser) {
        return new ResponseObject('success', 201, 'User updated successfully');
      }
      return new ResponseObject('not-found', 404, 'User not found', undefined);
    } catch (error) {
      throw error;
    }
  }
  @Put('phone/:phoneNumber')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async updateUserByPhoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedUser = await this.usersService.updateUserByPhoneNumber(
        phoneNumber,
        updateUserDto,
      );
      if (updatedUser) {
        return new ResponseObject('success', 201, 'User updated successfully');
      }
      return new ResponseObject('not-found', 404, 'User not found', undefined);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUserByID(@Param('id') id: string): Promise<ResponseObject<User>> {
    try {
      const deletedUser = await this.usersService.deleteUserByID(id);
      if (deletedUser) {
        return new ResponseObject('success', 200, 'User Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'User not found or deleted',
        undefined,
      );
    } catch (error) {
      throw error;
    }
  }
  @Delete('email/:email')
  async deleteUserByEmail(
    @Param('id', new ParseEmailPipe()) email: string,
  ): Promise<ResponseObject<User>> {
    try {
      const deletedUser = await this.usersService.deleteUserByEmail(email);
      if (deletedUser) {
        return new ResponseObject('success', 200, 'User Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'User not found or deleted',
        undefined,
      );
    } catch (error) {
      throw error;
    }
  }
  @Delete('phone/:phoneNumber')
  async deleteUserByphoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
  ): Promise<ResponseObject<User>> {
    try {
      const deletedUser =
        await this.usersService.deleteUserByPhoneNumber(phoneNumber);
      if (deletedUser) {
        return new ResponseObject('success', 200, 'User Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'User not found or deleted',
        undefined,
      );
    } catch (error) {
      throw error;
    }
  }

  @Post(':id/orders/:orderId')
  async addOrderToUser(
    @Param('id') id: string,
    @Param('orderId') orderId: string,
  ) {
    try {
      const updatedToken = await this.usersService.addOrderToUser(id, orderId);
      return { updatedToken };
    } catch (error) {
      throw new Error(`Error adding order to user: ${error.message}`);
    }
  }

  @Get(':id/orders')
  async allOrder(@Param('id') id: string) {
    return await this.usersService.allOrder(id);
  }
}
