import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    username: string;
    avatar: string;
    isEmailVerified: boolean;
    isActive: boolean;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
