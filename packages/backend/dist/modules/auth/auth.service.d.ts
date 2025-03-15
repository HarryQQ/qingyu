import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        username: string;
        avatar: string;
        isEmailVerified: boolean;
        isActive: boolean;
        roles: import("../roles/entities/role.entity").Role[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(data: any): Promise<{
        id: number;
        email: string;
        username: string;
        avatar: string;
        isEmailVerified: boolean;
        isActive: boolean;
        roles: import("../roles/entities/role.entity").Role[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
