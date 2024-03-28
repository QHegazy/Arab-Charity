import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from '../Dto/package/create-package.dto';
// import { UpdatePackageDto } from '../Dto/package/update-package.dto';

@Controller({ version: '1', path: 'package' })
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.create(createPackageDto);
  }

  @Get()
  findAll(@Query('items') item: string, @Query('page') page: string) {
    return this.packagesService.findAll(item, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
  //   return this.packagesService.update(id, updatePackageDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(id);
  }
}
