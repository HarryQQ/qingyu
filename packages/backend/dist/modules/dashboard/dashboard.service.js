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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const log_entity_1 = require("../logs/entities/log.entity");
const file_entity_1 = require("../files/entities/file.entity");
let DashboardService = class DashboardService {
    constructor(userRepository, logRepository, fileRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
        this.fileRepository = fileRepository;
    }
    async getStats() {
        const totalUsers = await this.userRepository.count();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentLogs = await this.logRepository.count({
            where: {
                createdAt: (0, typeorm_2.MoreThanOrEqual)(sevenDaysAgo),
            },
        });
        const totalFiles = await this.fileRepository.count();
        const recentUsers = await this.userRepository.find({
            order: {
                createdAt: 'DESC',
            },
            take: 5,
            select: ['id', 'username', 'email', 'createdAt'],
        });
        return {
            totalUsers,
            recentLogs,
            totalFiles,
            recentUsers,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __param(2, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map