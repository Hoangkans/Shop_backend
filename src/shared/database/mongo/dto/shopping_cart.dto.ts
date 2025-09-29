import { IsMongoId, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity?: number;
}
