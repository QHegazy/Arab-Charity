import { Injectable } from '@nestjs/common';
import { CreateOrgDto } from 'src/Dto/org/create.org.dto';
import { Org } from 'src/db/schemas/org.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateOrgDto } from 'src/Dto/org/update.org.dto';
import { PayloadOrg } from 'types/payload';
@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Org.name) private readonly OrgModel: Model<Org>,
    private jwtService: JwtService,
  ) {}
  saltOrRounds: number = 10;
  async createOrg(CreateOrgDto: CreateOrgDto): Promise<any> {
    const password = await bcrypt.hash(
      CreateOrgDto.Password,
      this.saltOrRounds,
    );
    const CreateOrg = new this.OrgModel();

    CreateOrg.Name = CreateOrgDto.Name;
    CreateOrg.PhoneNumber = CreateOrgDto.PhoneNumber;
    CreateOrg.Country = CreateOrgDto.Country;
    CreateOrg.Email = CreateOrgDto.Email;
    CreateOrg.Role = CreateOrgDto.Role;
    CreateOrg.Location = CreateOrgDto.Location;
    CreateOrg.Website = CreateOrgDto.Website;
    // CreateOrg.DateOfEstablishmentOfInstitution =
    //   CreateOrgDto.DateOfEstablishmentOfInstitution;
    CreateOrg.Password = password;
    CreateOrg.orders = CreateOrgDto.orders as any;

    return CreateOrg.save();
  }
  async findOrgByEmail(email: string): Promise<Org> {
    return this.OrgModel.findOne({ Email: email })
      .select('-__v -CreatedAt -Password')
      .exec();
  }
  async findOrgByID(id: string): Promise<Org> {
    return this.OrgModel.findById(id)
      .select('-__v -CreatedAt -_id -Password')
      .exec();
  }
  async findOrgByPhoneNumber(phoneNumber: number): Promise<Org> {
    return this.OrgModel.findOne({ PhoneNumber: phoneNumber });
  }
  async findAll(limit: number, role: string): Promise<Org[]> {
    return this.OrgModel.find({ Role: role }).limit(limit).exec();
  }
  async updateOrgByID(id: string, UpdateOrg: UpdateOrgDto): Promise<string> {
    const updateFields = await this.UpdateOrg(UpdateOrg);
    const updatedOrg = await this.OrgModel.findByIdAndUpdate(id, updateFields);
    const payload = this.Payload(updatedOrg);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }

  async updateOrgByEmail(
    email: string,
    UpdateOrg: UpdateOrgDto,
  ): Promise<string> {
    const updateFields = await this.UpdateOrg(UpdateOrg);

    const updatedOrg = await this.OrgModel.findByIdAndUpdate(
      { Email: email },
      updateFields,
    );
    const payload = this.Payload(updatedOrg);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }

  async updateOrgByPhoneNumber(
    phoneNumber: number,
    UpdateOrg: UpdateOrgDto,
  ): Promise<string> {
    const updateFields = await this.UpdateOrg(UpdateOrg);

    const updatedOrg = await this.OrgModel.findByIdAndUpdate(
      { PhoneNumber: phoneNumber },
      updateFields,
    );
    const payload = this.Payload(updatedOrg);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }
  async deleteOrgByPhoneNumber(phoneNumber: number): Promise<Org> {
    const deletedOrg = await this.OrgModel.findOneAndDelete({
      PhoneNumber: phoneNumber,
    });
    return deletedOrg;
  }
  async deleteOrgByEmail(email: string): Promise<Org> {
    return this.OrgModel.findOneAndDelete({ Email: email });
  }
  async deleteOrgByID(id: string): Promise<Org> {
    return this.OrgModel.findByIdAndDelete(id);
  }
  async getOrgByEmailPassword(email: string): Promise<Org> {
    return this.OrgModel.findOne({ Email: email });
  }
  async getOrgByPhoneNumberPassword(PhoneNumber: number): Promise<Org> {
    return this.OrgModel.findOne({ PhoneNumber: PhoneNumber });
  }
  refreshToken(payload: object): string {
    return this.jwtService.sign(payload);
  }
  private async UpdateOrg(UpdateOrg: UpdateOrgDto) {
    const updateFields: UpdateOrgDto = {
      Country: UpdateOrg.Country,
      Email: UpdateOrg.Email,
      Name: UpdateOrg.Name,
      PhoneNumber: UpdateOrg.PhoneNumber,
      Role: UpdateOrg.Role,
      // DateOfEstablishmentOfInstitution:
      //   UpdateOrg.DateOfEstablishmentOfInstitution,
    };

    if (UpdateOrg.Password) {
      updateFields.Password = await bcrypt.hash(
        UpdateOrg.Password,
        this.saltOrRounds,
      );
    }
    return updateFields;
  }
  private Payload(updatedOrg: any): PayloadOrg {
    const { Name, Role, Country, PhoneNumber, Location, Website, _id } =
      updatedOrg;
    return { Name, Role, Country, PhoneNumber, Location, Website, _id };
  }

  async addOrderToUser(id: string, orderId: string) {
    const updatedUser = await this.OrgModel.findByIdAndUpdate(
      id,
      { $push: { Orders: orderId } },
      { new: true },
    );
    const payload = this.Payload(updatedUser);
    const updatedToken = this.refreshToken(payload);
    return updatedToken;
  }
}
