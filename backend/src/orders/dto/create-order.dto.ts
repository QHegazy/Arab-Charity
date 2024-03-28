import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  Description: string;
  @IsString()
  @IsNotEmpty()
  Owner: string;

  @IsString()
  @IsNotEmpty()
  Package: string;

  @IsNotEmpty()
  @IsString()
  Mount: number;
}
