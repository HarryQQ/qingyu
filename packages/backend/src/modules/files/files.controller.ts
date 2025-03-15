// 导入必要的依赖
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('文件')
@Controller('files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return this.filesService.create(file, user);
  }

  @Get()
  @ApiOperation({ summary: '获取所有文件' })
  @Roles('admin')
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个文件' })
  async findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Get('download/:id')
  @ApiOperation({ summary: '下载文件' })
  async downloadFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.filesService.findOne(+id);
    const stream = createReadStream(join(process.cwd(), file.path));

    res.set({
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
      'Content-Type': file.mimeType,
    });

    return new StreamableFile(stream);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文件' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}