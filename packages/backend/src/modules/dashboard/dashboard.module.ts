import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../users/entities/user.entity';
import { Log } from '../logs/entities/log.entity';
import { File } from '../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log, File])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}