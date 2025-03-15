import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<Setting>);
    findAll(isPublic?: boolean): Promise<Setting[]>;
    findOne(key: string): Promise<Setting>;
    set(key: string, value: string, description?: string, isPublic?: boolean): Promise<Setting>;
    remove(key: string): Promise<void>;
}
