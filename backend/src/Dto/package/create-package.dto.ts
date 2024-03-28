import { IsNotEmpty, IsString } from 'class-validator';
import { Commodity } from '../../../types/package.interface';

export class CreatePackageDto implements Commodity {
  @IsNotEmpty()
  @IsString()
  Commodity: Commodity;

  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Description: string;
}
