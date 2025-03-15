import { User } from '../../users/entities/user.entity';
export declare class File {
    id: number;
    originalName: string;
    filename: string;
    path: string;
    mimeType: string;
    size: number;
    uploader: User;
    createdAt: Date;
    updatedAt: Date;
}
