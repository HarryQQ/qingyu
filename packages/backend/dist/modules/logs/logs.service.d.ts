import { Repository } from 'typeorm';
import { Request } from 'express';
import { Log, OperationType } from './entities/log.entity';
import { User } from '../users/entities/user.entity';
export declare class LogsService {
    private readonly logRepository;
    constructor(logRepository: Repository<Log>);
    create(type: OperationType, action: string, details: string, user: User, req: Request): Promise<Log>;
    findAll(page?: number, limit?: number, type?: OperationType, userId?: number): Promise<[Log[], number]>;
    findOne(id: number): Promise<Log>;
    remove(id: number): Promise<void>;
    clear(): Promise<void>;
}
