import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    create(data: Partial<Role>): Promise<Role>;
    update(id: number, data: Partial<Role>): Promise<Role>;
    remove(id: number): Promise<void>;
}
