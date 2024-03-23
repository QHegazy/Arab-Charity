import { Injectable } from '@nestjs/common';
import { CreateOrgDto } from 'src/Dto/org/create.org.dto';
import { Organisation } from 'src/db/schemas/org.schema';

@Injectable()
export class OrganizationsService {
  //   async createOrg(CreateOrgDto: CreateOrgDto): Promise<Organisation> {
  //     return;
  //   }
  //   async updateOrgByName(
  //     name: string,
  //     UpdateOrg: UpdateOrgDto,
  //   ): Promise<Organisation> {
  //     return;
  //   }
  //   async updateOrgByID(
  //     id: string,
  //     UpdateOrg: UpdateOrgDto,
  //   ): Promise<Organisation> {}
  //   async updateOrgByPhoneNumber(
  //     phoneNumber: string,
  //     UpdateOrg: UpdateOrgDto,
  //   ): Promise<Organisation> {}
  //   async deleteOrgByPhoneNumber(phoneNumber: string): Promise<Organisation> {}
  //   async deleteOrgByEmail(name: string): Promise<Organisation> {}
  //   async deleteOrgByID(id: string): Promise<Organisation> {}
  //   async findOrgByEmail(email: string): Promise<Organisation> {
  //     return;
  //   }
  //   async findOrgByID(id: string) {}
  //   async findOrgByPhoneNumber(phoneNumber: string): Promise<Organisation> {}
  //   async findAll(): Promise<Organisation[]> {
  //     return;
  //   }
}
