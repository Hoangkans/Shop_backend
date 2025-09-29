import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [{ type: String, ref: 'Role' }] })
  roles: string[]; // Tham chiếu đến Role bằng _id
}

export const UserSchema = SchemaFactory.createForClass(User);
