import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('用户')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  @Roles('admin')
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '获取单个用户' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: '创建用户' })
  @Post()
  @Roles('admin')
  async create(@Body() data: Partial<User>) {
    return this.usersService.create(data);
  }

  @ApiOperation({ summary: '更新用户' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.usersService.update(id, data);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}