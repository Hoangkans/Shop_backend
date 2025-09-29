import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from 'src/shopping_cart/shopping.controller';
import { ShoppingCartService } from 'src/shopping_cart/shopping.service';
import { ShoppingCartSchema } from 'src/shared/database/mongo/schemas/shopping_cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShoppingCart', schema: ShoppingCartSchema },
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
