import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/Dto/user/create.user.dto';
import { UpdateUserDto } from 'src/Dto/user/update.user.dto';
import { User } from 'src/db/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadUser } from 'types/payload';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  saltOrRounds: number = 10;
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const password = await bcrypt.hash(
      createUserDto.Password,
      this.saltOrRounds,
    );
    const createdUser = new this.userModel();
    createdUser.BirthDate = createUserDto.BirthDate;
    createdUser.FirstName = createUserDto.FirstName;
    createdUser.LastName = createUserDto.LastName;
    createdUser.PhoneNumber = createUserDto.PhoneNumber;
    createdUser.Country = createUserDto.Country;
    createdUser.Email = createUserDto.Email;
    createdUser.Role = createUserDto.Role;
    createdUser.Password = password;
    createdUser.orders = createUserDto.orders as any;

    return createdUser.save();
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel
      .findOne({ Email: email })
      .select('-__v -CreatedAt  -Password')
      .exec();
  }
  async findUserByID(id: string): Promise<User> {
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
  async updateUserByID(id: string, UpdateUser: UpdateUserDto): Promise<string> {
    const updateFields = await this.UpdateUser(UpdateUser);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true },
    );
    const payload = this.Payload(updatedUser);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }

  async updateUserByEmail(
    email: string,
    UpdateUser: UpdateUserDto,
  ): Promise<string> {
    const updateFields = await this.UpdateUser(UpdateUser);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      { Email: email },
      updateFields,
    );
    const payload = this.Payload(updatedUser);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }

  async updateUserByPhoneNumber(
    phoneNumber: number,
    UpdateUser: UpdateUserDto,
  ): Promise<string> {
    const updateFields = await this.UpdateUser(UpdateUser);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      { PhoneNumber: phoneNumber },
      updateFields,
    );
    const payload = this.Payload(updatedUser);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }
  async deleteUserByPhoneNumber(phoneNumber: number): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete({
      PhoneNumber: phoneNumber,
    });
    return deletedUser;
  }
  async deleteUserByEmail(email: string): Promise<User> {
    return this.userModel.findOneAndDelete({ Email: email });
  }
  async deleteUserByID(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
  async getUserByEmailPassword(email: string): Promise<User> {
    return this.userModel.findOne({ Email: email });
  }
  async getUserByPhoneNumberPassword(PhoneNumber: number): Promise<User> {
    return this.userModel.findOne({ PhoneNumber: PhoneNumber });
  }
  refreshToken(payload: object): string {
    return this.jwtService.sign(payload);
  }
  private async UpdateUser(UpdateUser: any) {
    const updateFields: any = {
      Country: UpdateUser.Country,
      Email: UpdateUser.Email,
      FirstName: UpdateUser.FirstName,
      LastName: UpdateUser.LastName,
      PhoneNumber: UpdateUser.PhoneNumber,
      Role: UpdateUser.Role,
      BirthDate: UpdateUser.BirthDate,
      orders: UpdateUser.orders,
    };

    if (UpdateUser.Password) {
      updateFields.Password = await bcrypt.hash(
        UpdateUser.Password,
        this.saltOrRounds,
      );
    }
    return updateFields;
  }
  private Payload(updatedUser: any): PayloadUser {
    const { FirstName, LastName, Role, Country, PhoneNumber } = updatedUser;
    return { FirstName, LastName, Role, Country, PhoneNumber };
  }
  async addOrderToUser(id: string, orderId: string) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { Orders: orderId } },
      { new: true },
    );
    const payload = this.Payload(updatedUser);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }
}
