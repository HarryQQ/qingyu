import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    create(data: Partial<Permission>): Promise<Permission>;
    update(id: number, data: Partial<Permission>): Promise<Permission>;
    remove(id: number): Promise<void>;
}
