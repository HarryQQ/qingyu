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
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@ApiTags('角色')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: '获取所有角色' })
  @Get()
  @Roles('admin')
  async findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: '获取单个角色' })
  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: '创建角色' })
  @Post()
  @Roles('admin')
  async create(@Body() data: Partial<Role>) {
    return this.rolesService.create(data);
  }

  @ApiOperation({ summary: '更新角色' })
  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: number, @Body() data: Partial<Role>) {
    return this.rolesService.update(id, data);
  }

  @ApiOperation({ summary: '删除角色' })
  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }
}