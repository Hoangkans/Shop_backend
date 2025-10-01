import { IsNotEmpty, IsDateString, IsMongoId, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsDateString()
  @IsNotEmpty()
  orderDate: string;

  @IsDateString()
  receiveDate?: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdateOrderDto {
  @IsDateString()
  receiveDate?: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
