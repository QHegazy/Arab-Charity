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
import { OrganizationsService } from './organizations.service';
import { ResponseObject } from 'src/messages/message';
import { Org } from 'src/db/schemas/org.schema';
import { ParseEmailPipe } from 'src/pipes/parse-email/parse-email.pipe';
import { UpdateOrgDto } from 'src/Dto/org/update.org.dto';
import { CreateOrgDto } from 'src/Dto/org/create.org.dto';

@Controller({ version: '1', path: 'orgs' })
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}
  @Post()
  @Header('Cache-Control', 'none')
  async createOrg(@Body() createOrgDto: CreateOrgDto): Promise<any> {
    try {
      const Org = await this.organizationsService.createOrg(createOrgDto);
      if (Org) {
        return new ResponseObject('success', 200, 'Org created successfully');
      }
      return new ResponseObject('error', 404, 'Org not  created', undefined);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOrgByID(@Param('id') id: string): Promise<ResponseObject<Org>> {
    const data = await this.organizationsService.findOrgByID(id);
    if (data)
      return new ResponseObject('success', 200, 'Org found successfully', data);
    return new ResponseObject('not-found', 404, 'Org not found', undefined);
  }

  @Get('email/:email')
  async findOrgByEmail(
    @Param('email', new ParseEmailPipe()) email: string,
  ): Promise<ResponseObject<Org>> {
    const data = await this.organizationsService.findOrgByEmail(email);
    if (data)
      return new ResponseObject('success', 200, 'Org found successfully', data);
    return new ResponseObject('not-found', 404, 'Org not found', undefined);
  }

  @Get('phone/:phoneNumber')
  async findOrgByPhoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
  ): Promise<ResponseObject<Org>> {
    const data =
      await this.organizationsService.findOrgByPhoneNumber(phoneNumber);
    if (data)
      return new ResponseObject('success', 200, 'Org found successfully', data);
    return new ResponseObject('not-found', 404, 'Org not found', undefined);
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('role') role: string,
  ): Promise<ResponseObject<Org[]>> {
    const data = await this.organizationsService.findAll(limit, role);
    if (data)
      return new ResponseObject(
        'success',
        200,
        'Orgs found successfully',
        data,
      );
    return new ResponseObject('not-founds', 404, 'Orgs not founds', undefined);
  }

  @Put(':id')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async updateOrgByID(
    @Param('id') id: string,
    @Body() updateOrgDto: UpdateOrgDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedOrg = await this.organizationsService.updateOrgByID(
        id,
        updateOrgDto,
      );
      if (updatedOrg) {
        return new ResponseObject(
          'success',
          201,
          'Org updated successfully',
          updatedOrg,
        );
      }
      return new ResponseObject('not-found', 404, 'Org not found', undefined);
    } catch (error) {
      throw error;
    }
  }
  @Put('email/:email')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async updateOrgByEmail(
    @Param('email', new ParseEmailPipe()) email: string,
    @Body() updateOrgDto: UpdateOrgDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedOrg = await this.organizationsService.updateOrgByEmail(
        email,
        updateOrgDto,
      );
      if (updatedOrg) {
        return new ResponseObject('success', 201, 'Org updated successfully');
      }
      return new ResponseObject('not-found', 404, 'Org not found', undefined);
    } catch (error) {
      throw error;
    }
  }
  @Put('phone/:phoneNumber')
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async updateOrgByPhoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
    @Body() updateOrgDto: UpdateOrgDto,
  ): Promise<ResponseObject<string>> {
    try {
      const updatedOrg = await this.organizationsService.updateOrgByPhoneNumber(
        phoneNumber,
        updateOrgDto,
      );
      if (updatedOrg) {
        return new ResponseObject('success', 201, 'Org updated successfully');
      }
      return new ResponseObject('not-found', 404, 'Org not found', undefined);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteOrgByID(@Param('id') id: string): Promise<ResponseObject<Org>> {
    try {
      const deletedOrg = await this.organizationsService.deleteOrgByID(id);
      if (deletedOrg) {
        return new ResponseObject('success', 200, 'Org Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'Org not found or deleted',
        undefined,
      );
    } catch (error) {
      throw error;
    }
  }
  @Delete('email/:email')
  async deleteOrgByEmail(
    @Param('id', new ParseEmailPipe()) email: string,
  ): Promise<ResponseObject<Org>> {
    try {
      const deletedOrg =
        await this.organizationsService.deleteOrgByEmail(email);
      if (deletedOrg) {
        return new ResponseObject('success', 200, 'Org Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'Org not found or deleted',
        undefined,
      );
    } catch (error) {
      throw error;
    }
  }
  @Delete('phone/:phoneNumber')
  async deleteOrgByphoneNumber(
    @Param('phoneNumber', new ParseIntPipe()) phoneNumber: number,
  ): Promise<ResponseObject<Org>> {
    try {
      const deletedOrg =
        await this.organizationsService.deleteOrgByPhoneNumber(phoneNumber);
      if (deletedOrg) {
        return new ResponseObject('success', 200, 'Org Deleted successfully');
      }
      return new ResponseObject(
        'not-found',
        404,
        'Org not found or deleted',
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
      const updatedToken = await this.organizationsService.addOrderToUser(id, orderId);
      return { updatedToken };
    } catch (error) {
      throw new Error(`Error adding order to user: ${error.message}`);
    }
  }
}
