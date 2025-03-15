// 导入必要的依赖
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Log, OperationType } from './entities/log.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  // 创建日志
  async create(
    type: OperationType,
    action: string,
    details: string,
    user: User,
    req: Request,
  ): Promise<Log> {
    const log = this.logRepository.create({
      type,
      action,
      details,
      user,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return this.logRepository.save(log);
  }

  // 获取所有日志
  async findAll(
    page = 1,
    limit = 10,
    type?: OperationType,
    userId?: number,
  ): Promise<[Log[], number]> {
    const query = this.logRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user')
      .orderBy('log.createdAt', 'DESC');

    if (type) {
      query.andWhere('log.type = :type', { type });
    }

    if (userId) {
      query.andWhere('user.id = :userId', { userId });
    }

    return query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  // 获取单个日志
  async findOne(id: number): Promise<Log> {
    return this.logRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  // 删除日志
  async remove(id: number): Promise<void> {
    await this.logRepository.delete(id);
  }

  // 清空日志
  async clear(): Promise<void> {
    await this.logRepository.clear();
  }
}