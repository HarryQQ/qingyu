// 导入必要的依赖
import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { OperationType } from './entities/log.entity';

@ApiTags('日志')
@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiOperation({ summary: '获取所有日志' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: OperationType })
  @ApiQuery({ name: 'userId', required: false, type: Number })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: OperationType,
    @Query('userId') userId?: number,
  ) {
    return this.logsService.findAll(page, limit, type, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个日志' })
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除日志' })
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }

  @Delete()
  @ApiOperation({ summary: '清空所有日志' })
  clear() {
    return this.logsService.clear();
  }
}