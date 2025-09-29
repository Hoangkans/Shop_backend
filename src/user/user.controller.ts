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
import { UsersService } from 'src/user/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/shared/database/mongo/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateStatus(id, updateUserDto.status || 'active');
  }

  @Post(':id/roles')
  async assignRole(
    @Param('id') userId: string,
    @Body('roleId') roleId: string,
  ) {
    return this.usersService.assignRole(userId, roleId);
  }
}
