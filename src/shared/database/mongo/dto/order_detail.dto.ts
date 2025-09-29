import { IsMongoId, IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsMongoId()
  @IsNotEmpty()
  orderId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;
}
