import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from 'src/orders/order.controller';
import { OrderService } from 'src/orders/order.service';
import { OrderSchema } from 'src/shared/database/mongo/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrderService],
})
export class OrderModule {}
