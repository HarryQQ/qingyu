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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// 定义日志类型
interface Log {
  id: number;
  type: string;
  action: string;
  details: string;
  ip: string;
  userAgent: string;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
}

// 日志管理页面组件
export default function LogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<Log[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [type, setType] = useState('');
  const [userId, setUserId] = useState('');

  // 获取日志列表
  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (type) {
        queryParams.append('type', type);
      }

      if (userId) {
        queryParams.append('userId', userId);
      }

      const response = await fetch(`/api/logs?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('获取日志列表失败');
      }

      const [data, count] = await response.json();
      setLogs(data);
      setTotal(count);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取日志列表失败',
        variant: 'destructive',
      });
    }
  };

  // 清空日志
  const handleClearLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/logs', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('清空日志失败');
      }

      toast({
        title: '成功',
        description: '日志已清空',
      });
      fetchLogs();
    } catch (error) {
      toast({
        title: '错误',
        description: '清空日志失败',
        variant: 'destructive',
      });
    }
  };

  // 格式化日期
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  useEffect(() => {
    fetchLogs();
  }, [page, type, userId]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">操作日志</h1>
        <div className="space-x-2">
          <Button onClick={() => router.push('/dashboard')}>
            返回仪表板
          </Button>
          <Button
            variant="destructive"
            onClick={handleClearLogs}
          >
            清空日志
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <Select
          value={type}
          onValueChange={setType}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="选择操作类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部</SelectItem>
            <SelectItem value="create">创建</SelectItem>
            <SelectItem value="update">更新</SelectItem>
            <SelectItem value="delete">删除</SelectItem>
            <SelectItem value="login">登录</SelectItem>
            <SelectItem value="logout">登出</SelectItem>
            <SelectItem value="upload">上传</SelectItem>
            <SelectItem value="download">下载</SelectItem>
            <SelectItem value="other">其他</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="用户ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-[200px]"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>详情</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>用户</TableHead>
            <TableHead>时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.type}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell>{log.ip}</TableCell>
              <TableCell>{log.user.username}</TableCell>
              <TableCell>{formatDate(log.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {Array.from(
              { length: Math.ceil(total / limit) },
              (_, i) => i + 1
            ).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => setPage(pageNumber)}
                  isActive={page === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage(Math.min(Math.ceil(total / limit), page + 1))
                }
                disabled={page === Math.ceil(total / limit)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}