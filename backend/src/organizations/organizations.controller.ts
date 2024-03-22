import { Controller, Get, Post } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller({ version: '1', path: 'orgs' })
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}
  @Get()
  async users() {
    return;
  }
  //   @Post()
  //   async createUser(@Body() CreateOrg: ) {
  //     return await this.UsersServices.createUser(CreateUser);
  //   }
}
