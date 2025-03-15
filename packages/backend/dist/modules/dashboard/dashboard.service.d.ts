import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Log } from '../logs/entities/log.entity';
import { File } from '../files/entities/file.entity';
export declare class DashboardService {
    private readonly userRepository;
    private readonly logRepository;
    private readonly fileRepository;
    constructor(userRepository: Repository<User>, logRepository: Repository<Log>, fileRepository: Repository<File>);
    getStats(): Promise<{
        totalUsers: number;
        recentLogs: number;
        totalFiles: number;
        recentUsers: User[];
    }>;
}
