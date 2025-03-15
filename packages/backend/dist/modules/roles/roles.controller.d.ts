import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    create(data: Partial<Role>): Promise<Role>;
    update(id: number, data: Partial<Role>): Promise<Role>;
    remove(id: number): Promise<void>;
}
