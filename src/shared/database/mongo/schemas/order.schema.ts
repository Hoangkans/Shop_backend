import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  orderDate: Date;

  @Prop()
  receiveDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  status: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail' }],
  })
  orderDetails: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
