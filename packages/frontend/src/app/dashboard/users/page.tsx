// 导入必要的依赖
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { Stats } from '@/types/stats';

// 定义用户类型
interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

// 用户管理页面组件
export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // 修改为正确的接口路径
      const data = await api.get<Stats>('/dashboard/stats');
      setUsers(data.recentUsers);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取用户列表失败',
        variant: 'destructive',
      });
    }
  };

  // 删除用户
  const handleDeleteUser = async (userId: number) => {
    try {
      await api.delete(`/api/users/${userId}`);
      toast({
        title: '成功',
        description: '用户已删除',
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: '错误',
        description: '删除用户失败',
        variant: 'destructive',
      });
    }
  };

  // 过滤用户列表
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">用户管理</h1>
        <Button onClick={() => router.push('/dashboard')}>返回仪表板</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="搜索用户..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>用户名</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedUser(user)}
                      >
                        查看
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>用户详情</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>
                          <strong>ID:</strong> {selectedUser?.id}
                        </p>
                        <p>
                          <strong>用户名:</strong> {selectedUser?.username}
                        </p>
                        <p>
                          <strong>邮箱:</strong> {selectedUser?.email}
                        </p>
                        <p>
                          <strong>创建时间:</strong>{' '}
                          {selectedUser?.createdAt &&
                            new Date(
                              selectedUser.createdAt
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    删除
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}