import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async findAll(isPublic?: boolean) {
    const query = this.settingRepository.createQueryBuilder('setting');
    if (typeof isPublic === 'boolean') {
      query.where('setting.isPublic = :isPublic', { isPublic });
    }
    return query.getMany();
  }

  async findOne(key: string) {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) {
      throw new NotFoundException('设置项不存在');
    }
    return setting;
  }

  async set(key: string, value: string, description?: string, isPublic = false) {
    let setting = await this.settingRepository.findOne({ where: { key } });
    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
      setting.isPublic = isPublic;
    } else {
      setting = this.settingRepository.create({
        key,
        value,
        description,
        isPublic,
      });
    }
    return this.settingRepository.save(setting);
  }

  async remove(key: string) {
    const result = await this.settingRepository.delete(key);
    if (!result.affected) {
      throw new NotFoundException('设置项不存在');
    }
  }
}