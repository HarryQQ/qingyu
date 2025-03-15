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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendVerificationEmail(user, token) {
        const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: '请验证您的邮箱',
            template: './verification',
            context: {
                name: user.username,
                url,
            },
        });
    }
    async sendPasswordResetEmail(user, token) {
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: '重置密码',
            template: './reset-password',
            context: {
                name: user.username,
                url,
            },
        });
    }
    async sendWelcomeEmail(user) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: '欢迎加入轻语',
            template: './welcome',
            context: {
                name: user.username,
            },
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map