import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        totalUsers: number;
        recentLogs: number;
        totalFiles: number;
        recentUsers: import("../users/entities/user.entity").User[];
    }>;
}
