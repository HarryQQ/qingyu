import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    create(data: Partial<Permission>): Promise<Permission>;
    update(id: number, data: Partial<Permission>): Promise<Permission>;
    remove(id: number): Promise<void>;
}
