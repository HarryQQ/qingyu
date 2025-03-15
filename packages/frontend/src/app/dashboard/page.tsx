// 导入必要的依赖
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { Stats } from '@/types/stats';

// 仪表板页面组件
export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    recentLogs: 0,
    totalFiles: 0,
    recentUsers: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // 获取统计数据
  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await api.get<Stats>('/dashboard/stats');
      setStats(data);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取统计数据失败',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
            <Button onClick={handleLogout} variant="outline">
              登出
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg text-gray-500">加载中...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>用户总数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>最近日志数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.recentLogs}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>文件总数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalFiles}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">最近注册用户</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">快速操作</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button
                    onClick={() => router.push('/dashboard/users')}
                    className="h-24"
                  >
                    用户管理
                  </Button>
                  <Button
                    onClick={() => router.push('/dashboard/roles')}
                    className="h-24"
                  >
                    角色管理
                  </Button>
                  <Button
                    onClick={() => router.push('/dashboard/permissions')}
                    className="h-24"
                  >
                    权限管理
                  </Button>
                  <Button
                    onClick={() => router.push('/dashboard/settings')}
                    className="h-24"
                  >
                    系统设置
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}