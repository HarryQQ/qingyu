"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async findAll(isPublic) {
        const query = this.settingRepository.createQueryBuilder('setting');
        if (typeof isPublic === 'boolean') {
            query.where('setting.isPublic = :isPublic', { isPublic });
        }
        return query.getMany();
    }
    async findOne(key) {
        const setting = await this.settingRepository.findOne({ where: { key } });
        if (!setting) {
            throw new common_1.NotFoundException('设置项不存在');
        }
        return setting;
    }
    async set(key, value, description, isPublic = false) {
        let setting = await this.settingRepository.findOne({ where: { key } });
        if (setting) {
            setting.value = value;
            if (description)
                setting.description = description;
            setting.isPublic = isPublic;
        }
        else {
            setting = this.settingRepository.create({
                key,
                value,
                description,
                isPublic,
            });
        }
        return this.settingRepository.save(setting);
    }
    async remove(key) {
        const result = await this.settingRepository.delete(key);
        if (!result.affected) {
            throw new common_1.NotFoundException('设置项不存在');
        }
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map