import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from 'src/module/product/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/shared/database/mongo/dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put(':id/status')
  @UsePipes(new ValidationPipe())
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.productsService.updateStatus(id, status);
  }
}
