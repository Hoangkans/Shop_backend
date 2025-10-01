import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { CategoriesService } from 'src/category/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/shared/database/mongo/dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.categoryService.updateStatus(id, status);
  }
}
