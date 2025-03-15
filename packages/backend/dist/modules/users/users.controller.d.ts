import { UsersService } from './users.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(data: Partial<User>): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
