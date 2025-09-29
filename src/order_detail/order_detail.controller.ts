import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderDetailService } from 'src/order_detail/order_detail.service';
import { CreateOrderDetailDto } from 'src/shared/database/mongo/dto/order_detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}

  @Get(':orderId')
  async findByOrder(@Param('orderId') orderId: string) {
    return this.orderDetailService.findByOrder(orderId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }
}
