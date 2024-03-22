import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/Dto/user/create.user.dto';
import { UpdateUserDto } from 'src/Dto/user/update.user.dto';
import { User } from 'src/db/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  saltOrRounds: number = 10;
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const password = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const createdUser = new this.userModel();
    createdUser.BirthDate = createUserDto.birthDate;
    createdUser.FirstName = createUserDto.firstName;
    createdUser.LastName = createUserDto.lastName;
    createdUser.PhoneNumber = createUserDto.phoneNumber;
    createdUser.Country = createUserDto.country;
    createdUser.Email = createUserDto.email;
    createdUser.Role = createUserDto.role;
    createdUser.Password = password;

    return createdUser.save();
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel
      .findOne({ Email: email })
      .select('-__v -CreatedAt -_id -Password')
      .exec();
  }
  async findUserByID(id: string): Promise<User> {
    const x = await this.userModel.findById(id);
    console.log(await bcrypt.compare(id, x.Password));
    return this.userModel
      .findById(id)
      .select('-__v -CreatedAt -_id -Password')
      .exec();
  }
  async findUserByPhoneNumber(phoneNumber: number): Promise<User> {
    return this.userModel.findOne({ PhoneNumber: phoneNumber });
  }
  async findAll(limit: number, role: string): Promise<User[]> {
    return this.userModel.find({ Role: role }).limit(limit).exec();
  }
  async updateUserByID(id: string, UpdateUser: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, {
      Country: UpdateUser.country,
      Email: UpdateUser.email,
      FirstName: UpdateUser.firstName,
      LastName: UpdateUser.lastName,
      PhoneNumber: UpdateUser.phoneNumber,
      Role: UpdateUser.role,
      BirthDate: UpdateUser.birthDate,
      Password: await bcrypt.hash(UpdateUser.password, this.saltOrRounds),
    });
  }

  async updateUserByEmail(
    email: string,
    UpdateUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { Email: email },
      {
        Country: UpdateUser.country,
        Email: UpdateUser.email,
        FirstName: UpdateUser.firstName,
        LastName: UpdateUser.lastName,
        PhoneNumber: UpdateUser.phoneNumber,
        Role: UpdateUser.role,
        BirthDate: UpdateUser.birthDate,
        Password: await bcrypt.hash(UpdateUser.password, this.saltOrRounds),
      },
    );
  }

  async updateUserByPhoneNumber(
    phoneNumber: number,
    UpdateUser: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { PhoneNumber: phoneNumber },
      {
        Country: UpdateUser.country,
        Email: UpdateUser.email,
        FirstName: UpdateUser.firstName,
        LastName: UpdateUser.lastName,
        PhoneNumber: UpdateUser.phoneNumber,
        Role: UpdateUser.role,
        BirthDate: UpdateUser.birthDate,
        Password: await bcrypt.hash(UpdateUser.password, this.saltOrRounds),
      },
    );
  }
  async deleteUserByPhoneNumber(phoneNumber: number): Promise<User> {
    return this.userModel.findOneAndDelete({ PhoneNumber: phoneNumber });
  }
  async deleteUserByEmail(email: string): Promise<User> {
    return this.userModel.findOneAndDelete({ Email: email });
  }
  async deleteUserByID(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
