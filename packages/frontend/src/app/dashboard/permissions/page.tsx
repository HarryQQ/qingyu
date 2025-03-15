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
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';

// 定义权限类型
interface Permission {
  id: number;
  name: string;
  description: string;
  action: string;
  resource: string;
  createdAt: string;
}

// 权限管理页面组件
export default function PermissionsPage() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(
    null
  );
  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    action: '',
    resource: '',
  });

  // 获取权限列表
  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await api.get<Permission[]>('/permissions');
      setPermissions(data);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取权限列表失败',
        variant: 'destructive',
      });
    }
  };

  // 创建新权限
  const handleCreatePermission = async () => {
    try {
      await api.post('/permissions', newPermission);
      toast({
        title: '成功',
        description: '权限已创建',
      });
      fetchPermissions();
      setNewPermission({
        name: '',
        description: '',
        action: '',
        resource: '',
      });
    } catch (error) {
      toast({
        title: '错误',
        description: '创建权限失败',
        variant: 'destructive',
      });
    }
  };

  // 删除权限
  const handleDeletePermission = async (permissionId: number) => {
    try {
      await api.delete(`/permissions/${permissionId}`);
      toast({
        title: '成功',
        description: '权限已删除',
      });
      fetchPermissions();
    } catch (error) {
      toast({
        title: '错误',
        description: '删除权限失败',
        variant: 'destructive',
      });
    }
  };

  // 过滤权限列表
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">权限管理</h1>
        <Button onClick={() => router.push('/dashboard')}>返回仪表板</Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="搜索权限..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>创建权限</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新权限</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">权限名称</Label>
                <Input
                  id="name"
                  value={newPermission.name}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">描述</Label>
                <Input
                  id="description"
                  value={newPermission.description}
                  onChange={(e) =>
                    setNewPermission({
                      ...newPermission,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="action">操作</Label>
                <Input
                  id="action"
                  value={newPermission.action}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, action: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="resource">资源</Label>
                <Input
                  id="resource"
                  value={newPermission.resource}
                  onChange={(e) =>
                    setNewPermission({
                      ...newPermission,
                      resource: e.target.value,
                    })
                  }
                />
              </div>
              <Button onClick={handleCreatePermission}>创建</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>资源</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPermissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.id}</TableCell>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell>{permission.action}</TableCell>
              <TableCell>{permission.resource}</TableCell>
              <TableCell>
                {new Date(permission.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPermission(permission)}
                      >
                        查看
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>权限详情</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>
                          <strong>ID:</strong> {selectedPermission?.id}
                        </p>
                        <p>
                          <strong>名称:</strong> {selectedPermission?.name}
                        </p>
                        <p>
                          <strong>描述:</strong>{' '}
                          {selectedPermission?.description}
                        </p>
                        <p>
                          <strong>操作:</strong> {selectedPermission?.action}
                        </p>
                        <p>
                          <strong>资源:</strong> {selectedPermission?.resource}
                        </p>
                        <p>
                          <strong>创建时间:</strong>{' '}
                          {selectedPermission?.createdAt &&
                            new Date(
                              selectedPermission.createdAt
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeletePermission(permission.id)}
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