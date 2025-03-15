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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const settings_service_1 = require("./settings.service");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async findAll(isPublic) {
        return this.settingsService.findAll(isPublic);
    }
    async findOne(key) {
        return this.settingsService.findOne(key);
    }
    async set(key, value, description, isPublic) {
        return this.settingsService.set(key, value, description, isPublic);
    }
    async remove(key) {
        return this.settingsService.remove(key);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取所有设置' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('isPublic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取单个设置' }),
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新设置' }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)('key')),
    __param(1, (0, common_1.Body)('value')),
    __param(2, (0, common_1.Body)('description')),
    __param(3, (0, common_1.Body)('isPublic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "set", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除设置' }),
    (0, common_1.Delete)(':key'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "remove", null);
exports.SettingsController = SettingsController = __decorate([
    (0, swagger_1.ApiTags)('系统设置'),
    (0, common_1.Controller)('settings'),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map