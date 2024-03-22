// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/Dto/user/create.user.dto';
import { UpdateUserDto } from 'src/Dto/user/update.user.dto';
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
    return createdUser.save();
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ Email: email });
  }
  async findUserByID(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async findUserByPhoneNumber(phoneNumber: number): Promise<User> {
    return this.userModel.findOne({ PhoneNumber: phoneNumber });
  }
  async findAll(limit: number, role: string): Promise<User[]> {
    return this.userModel.find({ Role: role }).limit(limit).exec();
  }

  async updateUserByEmail(
    email: string,
    UpdateUser: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ Email: email }, UpdateUser);
  }

  async updateUserByID(id: string, UpdateUser: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, UpdateUser);
  }
  async updateUserByPhoneNumber(
    phoneNumber: string,
    UpdateUser: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { PhoneNumber: phoneNumber },
      UpdateUser,
    );
  }
  async deleteUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userModel.findOneAndDelete({ PhoneNumber: phoneNumber });
  }
  async deleteUserByEmail(email: string): Promise<User> {
    return this.userModel.findOneAndDelete({ Email: email });
  }
  async deleteUserByID(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
