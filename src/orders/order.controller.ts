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
import { OrderService } from 'src/orders/order.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
} from 'src/shared/database/mongo/dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.orderService.findByUser(userId);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateStatus(id, updateOrderDto.status || '');
  }
}
