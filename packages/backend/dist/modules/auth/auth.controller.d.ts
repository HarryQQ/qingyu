import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: {
        email: string;
        password: string;
        username: string;
    }): Promise<{
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
