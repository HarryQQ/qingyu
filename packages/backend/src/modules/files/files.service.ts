// 导入必要的依赖
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  // 创建文件记录
  async create(
    file: Express.Multer.File,
    uploader: User,
  ): Promise<File> {
    const newFile = this.fileRepository.create({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      uploader,
    });

    return this.fileRepository.save(newFile);
  }

  // 获取所有文件
  async findAll(): Promise<File[]> {
    return this.fileRepository.find({
      relations: ['uploader'],
    });
  }

  // 获取单个文件
  async findOne(id: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: { id },
      relations: ['uploader'],
    });

    if (!file) {
      throw new NotFoundException(`文件 #${id} 未找到`);
    }

    return file;
  }

  // 删除文件
  async remove(id: number): Promise<void> {
    const result = await this.fileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`文件 #${id} 未找到`);
    }
  }
}