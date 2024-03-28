import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from '../Dto/package/create-package.dto';
import { UpdatePackageDto } from '../Dto/package/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from 'src/db/schemas/package.schema';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
  ) {}
  create(createPackageDto: any) {
    return this.packageModel.create(createPackageDto);
  }

  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return this.packageModel.findById(id);
  }

  update(id: number, updatePackageDto: any) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
