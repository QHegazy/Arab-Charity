// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/Dto/create.user.dto';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel();
    createdUser.BirthDate = createUserDto.birthDate;
    createdUser.FirstName = createUserDto.firstName;
    createdUser.LastName = createUserDto.lastName;
    createdUser.PhoneNumber = createUserDto.phoneNumber;
    createdUser.Country = createUserDto.country;
    createdUser.Email = createUserDto.email;
    createdUser.Role = createUserDto.role;
    createdUser.Password = createUserDto.password;

    return createdUser;
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
