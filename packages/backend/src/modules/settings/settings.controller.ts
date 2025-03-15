import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SettingsService } from './settings.service';

@ApiTags('系统设置')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOperation({ summary: '获取所有设置' })
  @Get()
  async findAll(@Query('isPublic') isPublic?: boolean) {
    return this.settingsService.findAll(isPublic);
  }

  @ApiOperation({ summary: '获取单个设置' })
  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.settingsService.findOne(key);
  }

  @ApiOperation({ summary: '更新设置' })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async set(
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('description') description?: string,
    @Body('isPublic') isPublic?: boolean,
  ) {
    return this.settingsService.set(key, value, description, isPublic);
  }

  @ApiOperation({ summary: '删除设置' })
  @Delete(':key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async remove(@Param('key') key: string) {
    return this.settingsService.remove(key);
  }
}