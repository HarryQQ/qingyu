import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(isPublic?: boolean): Promise<import("./entities/setting.entity").Setting[]>;
    findOne(key: string): Promise<import("./entities/setting.entity").Setting>;
    set(key: string, value: string, description?: string, isPublic?: boolean): Promise<import("./entities/setting.entity").Setting>;
    remove(key: string): Promise<void>;
}
