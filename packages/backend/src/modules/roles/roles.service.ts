import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async create(data: Partial<Role>) {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async update(id: number, data: Partial<Role>) {
    await this.roleRepository.update(id, data);
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async remove(id: number) {
    await this.roleRepository.delete(id);
  }
}