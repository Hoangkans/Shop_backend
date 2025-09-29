import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetailController } from 'src/order_detail/order_detail.controller';
import { OrderDetailService } from 'src/order_detail/order_detail.service';
import { OrderDetailSchema } from 'src/shared/database/mongo/schemas/order_detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OrderDetail', schema: OrderDetailSchema },
    ]),
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
