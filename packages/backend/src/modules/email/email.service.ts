// 导入必要的依赖
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  // 发送验证邮件
  async sendVerificationEmail(user: User, token: string) {
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

  // 发送重置密码邮件
  async sendPasswordResetEmail(user: User, token: string) {
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

  // 发送欢迎邮件
  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: '欢迎加入轻语',
      template: './welcome',
      context: {
        name: user.username,
      },
    });
  }
}