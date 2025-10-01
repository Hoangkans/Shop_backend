import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/shared/database/mongo/schemas/user.schema';
import { CreateUserDto } from 'src/shared/database/mongo/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('roles');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      ...rest,
      password: hashedPassword,
      roles: [],
    });
    return user.save();
  }

  async updateStatus(id: string, status: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async assignRole(userId: string, roleId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.roles.push(roleId);
    return user.save();
  }
}
