import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Commodity } from '../../../types/package.interface';

export class CreatePackageDto implements Commodity {
  title: string;
  description: string;
  @IsString()
  @IsNotEmpty()
  Commodity: string;

  @IsNotEmpty()
  @IsNumber()
  Mount: number;
}
