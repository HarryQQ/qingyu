import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll() {
    return this.permissionRepository.find();
  }

  async findOne(id: number) {
    return this.permissionRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Permission>) {
    const permission = this.permissionRepository.create(data);
    return this.permissionRepository.save(permission);
  }

  async update(id: number, data: Partial<Permission>) {
    await this.permissionRepository.update(id, data);
    return this.permissionRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.permissionRepository.delete(id);
  }
}