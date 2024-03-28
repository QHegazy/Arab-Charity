import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Package, PackageSchema } from 'src/db/schemas/package.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Package.name,
        useFactory: () => {
          const schema = PackageSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'), {
            message: 'Duplicate entry',
          });
          return schema;
        },
      },
    ]),
  ],

  controllers: [PackagesController],
  exports: [PackagesService],
  providers: [PackagesService],
})
export class PackagesModule {}
