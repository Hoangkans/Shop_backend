import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from 'src/module/orders/order.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
} from 'src/shared/database/mongo/dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrderService) {}

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id/status')
  @UsePipes(new ValidationPipe())
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderDto.status);
  }
}
