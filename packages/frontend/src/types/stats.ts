// 定义统计数据类型
export interface Stats {
  totalUsers: number;
  recentLogs: number;
  totalFiles: number;
  recentUsers: Array<{
    id: number;
    username: string;
    email: string;
    createdAt: string;
  }>;
}
