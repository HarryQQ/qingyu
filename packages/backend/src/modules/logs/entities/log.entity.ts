// 导入必要的依赖
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

// 操作类型枚举
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
  OTHER = 'other',
}

// 日志实体
@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OperationType,
    default: OperationType.OTHER,
  })
  type: OperationType;

  @Column()
  action: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}