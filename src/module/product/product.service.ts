import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/shared/database/mongo/schemas/product.schema';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/shared/database/mongo/dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll() {
    return this.productModel.find().populate('categoryId');
  }

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateStatus(id: string, status: string) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
