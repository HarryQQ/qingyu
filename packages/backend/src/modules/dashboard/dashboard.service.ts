import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Log } from '../logs/entities/log.entity';
import { File } from '../files/entities/file.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getStats() {
    // 获取用户总数
    const totalUsers = await this.userRepository.count();

    // 获取最近7天的日志数量
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentLogs = await this.logRepository.count({
      where: {
        createdAt: MoreThanOrEqual(sevenDaysAgo),
      },
    });

    // 获取文件总数
    const totalFiles = await this.fileRepository.count();

    // 获取最近注册的用户
    const recentUsers = await this.userRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 5,
      select: ['id', 'username', 'email', 'createdAt'],
    });

    return {
      totalUsers,
      recentLogs,
      totalFiles,
      recentUsers,
    };
  }
}