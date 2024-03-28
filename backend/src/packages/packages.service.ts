import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from '../Dto/package/create-package.dto';
// import { UpdatePackageDto } from '../Dto/package/update-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from 'src/db/schemas/package.schema';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private readonly packageModel: Model<Package>,
  ) {}
  create(createPackageDto: CreatePackageDto) {
    return this.packageModel.create(createPackageDto);
  }

  async findAll(item: string, page: string) {
    try {
      const packages = await this.packageModel.find().skip(+page).limit(+item);
      return {
        currentPage: parseInt(page),
        perPage: item,
        data: packages,
      };
    } catch (error) {
      throw new Error(`Error while fetching packages: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.packageModel.findById(id);
  }

  remove(id: string) {
    return this.packageModel.findByIdAndDelete(id);
  }
}
