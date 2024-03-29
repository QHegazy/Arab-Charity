import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  User: string;

  @IsString()
  @IsOptional()
  Org: string;

  @IsString()
  @IsNotEmpty()
  Package: string;

  @IsNotEmpty()
  @IsString()
  Mount: number;
}
