import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShoppingCartService } from 'src/module/shopping_cart/shopping.service';
import {
  CreateCartItemDto,
  UpdateCartItemDto,
} from 'src/shared/database/mongo/dto/shopping_cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.shoppingCartService.findAllByUser(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addItem(@Body() createCartItemDto: CreateCartItemDto) {
    return this.shoppingCartService.addItem(createCartItemDto);
  }

  @Put(':id/quantity')
  @UsePipes(new ValidationPipe())
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.shoppingCartService.updateQuantity(
      id,
      updateCartItemDto.quantity,
    );
  }

  @Delete(':id')
  async removeItem(@Param('id') id: string) {
    return this.shoppingCartService.removeItem(id);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    return this.shoppingCartService.clearCart(userId);
  }
}
