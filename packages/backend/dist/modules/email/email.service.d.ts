import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendVerificationEmail(user: User, token: string): Promise<void>;
    sendPasswordResetEmail(user: User, token: string): Promise<void>;
    sendWelcomeEmail(user: User): Promise<void>;
}
