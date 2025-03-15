import { LogsService } from './logs.service';
import { OperationType } from './entities/log.entity';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    findAll(page?: number, limit?: number, type?: OperationType, userId?: number): Promise<[import("./entities/log.entity").Log[], number]>;
    findOne(id: string): Promise<import("./entities/log.entity").Log>;
    remove(id: string): Promise<void>;
    clear(): Promise<void>;
}
