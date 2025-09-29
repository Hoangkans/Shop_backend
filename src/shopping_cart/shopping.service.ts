import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart } from 'src/shared/database/mongo/schemas/shopping_cart.schema';
import { CreateCartItemDto } from 'src/shared/database/mongo/dto/shopping_cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel('ShoppingCart') private shoppingCartModel: Model<ShoppingCart>,
  ) {}

  async findAllByUser(userId: string) {
    return this.shoppingCartModel.find({ userId }).populate('productId');
  }

  async addItem(createCartItemDto: CreateCartItemDto) {
    const cartItem = new this.shoppingCartModel(createCartItemDto);
    return cartItem.save();
  }

  async updateQuantity(id: string, quantity: number) {
    const cartItem = await this.shoppingCartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true },
    );
    if (!cartItem) throw new NotFoundException('Cart item not found');
    return cartItem;
  }

  async removeItem(id: string) {
    const cartItem = await this.shoppingCartModel.findByIdAndDelete(id);
    if (!cartItem) throw new NotFoundException('Cart item not found');
    return { message: 'Item removed successfully' };
  }

  async clearCart(userId: string) {
    const result = await this.shoppingCartModel.deleteMany({ userId });
    return { message: `Cleared ${result.deletedCount} items from cart` };
  }
}
