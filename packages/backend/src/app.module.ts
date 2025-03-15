import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { RolesModule } from "./modules/roles/roles.module";
import { PermissionsModule } from "./modules/permissions/permissions.module";
import { LogsModule } from "./modules/logs/logs.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 数据库模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    // 功能模块
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    LogsModule,
    SettingsModule,
    DashboardModule,
  ],
})
export class AppModule {}
