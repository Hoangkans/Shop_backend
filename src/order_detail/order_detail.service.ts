import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetail } from 'src/shared/database/mongo/schemas/order_detail.schema';
import { CreateOrderDetailDto } from 'src/shared/database/mongo/dto/order_detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel('OrderDetail') private orderDetailModel: Model<OrderDetail>,
  ) {}

  async findByOrder(orderId: string) {
    return this.orderDetailModel.find({ orderId }).populate('productId');
  }

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = new this.orderDetailModel(createOrderDetailDto);
    return orderDetail.save();
  }
}
