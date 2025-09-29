import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { CategorySchema } from 'src/shared/database/mongo/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoryService],
})
export class CategoryModule {}
