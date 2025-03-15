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
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';

@ApiTags('权限')
@Controller('permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({ summary: '获取所有权限' })
  @Get()
  @Roles('admin')
  async findAll() {
    return this.permissionsService.findAll();
  }

  @ApiOperation({ summary: '获取单个权限' })
  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @ApiOperation({ summary: '创建权限' })
  @Post()
  @Roles('admin')
  async create(@Body() data: Partial<Permission>) {
    return this.permissionsService.create(data);
  }

  @ApiOperation({ summary: '更新权限' })
  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: number, @Body() data: Partial<Permission>) {
    return this.permissionsService.update(id, data);
  }

  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}