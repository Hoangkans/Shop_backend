import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/shared/database/mongo/schemas/order.schema';
import { CreateOrderDto } from 'src/shared/database/mongo/dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async findAll() {
    return this.orderModel.find().populate('orderDetails').populate('userId');
  }

  async findByUser(userId: string) {
    return this.orderModel.find({ userId }).populate('orderDetails');
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);
    return order.save();
  }

  async updateStatus(id: string, status: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
