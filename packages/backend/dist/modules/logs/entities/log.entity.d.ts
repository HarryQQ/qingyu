import { User } from '../../users/entities/user.entity';
export declare enum OperationType {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    LOGIN = "login",
    LOGOUT = "logout",
    UPLOAD = "upload",
    DOWNLOAD = "download",
    OTHER = "other"
}
export declare class Log {
    id: number;
    type: OperationType;
    action: string;
    details: string;
    ip: string;
    userAgent: string;
    user: User;
    createdAt: Date;
}
