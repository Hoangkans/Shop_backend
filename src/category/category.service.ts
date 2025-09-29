import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/shared/database/mongo/schemas/category.schema';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/shared/database/mongo/dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    return this.categoryModel.find();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async updateStatus(id: string, status: string) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
