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
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';

// 定义角色和权限类型
interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

// 角色管理页面组件
export default function RolesPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as number[],
  });

  // 获取角色列表
  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await api.get<Role[]>('/roles');
      setRoles(data.data);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取角色列表失败',
        variant: 'destructive',
      });
    }
  };

  // 获取权限列表
  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await api.get<Permission[]>('/permissions');
      setPermissions(data.data);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取权限列表失败',
        variant: 'destructive',
      });
    }
  };

  // 创建新角色
  const handleCreateRole = async () => {
    try {
      await api.post('/roles', newRole);
      toast({
        title: '成功',
        description: '角色已创建',
      });
      fetchRoles();
      setNewRole({
        name: '',
        description: '',
        permissions: [],
      });
    } catch (error) {
      toast({
        title: '错误',
        description: '创建角色失败',
        variant: 'destructive',
      });
    }
  };

  // 删除角色
  const handleDeleteRole = async (roleId: number) => {
    try {
      await api.delete(`/roles/${roleId}`);
      toast({
        title: '成功',
        description: '角色已删除',
      });
      fetchRoles();
    } catch (error) {
      toast({
        title: '错误',
        description: '删除角色失败',
        variant: 'destructive',
      });
    }
  };

  // 过滤角色列表
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">角色管理</h1>
        <Button onClick={() => router.push('/dashboard')}>返回仪表板</Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="搜索角色..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>创建角色</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新角色</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">角色名称</Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">描述</Label>
                <Input
                  id="description"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>权限</Label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={newRole.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewRole({
                              ...newRole,
                              permissions: [...newRole.permissions, permission.id],
                            });
                          } else {
                            setNewRole({
                              ...newRole,
                              permissions: newRole.permissions.filter(
                                (id) => id !== permission.id
                              ),
                            });
                          }
                        }}
                      />
                      <Label
                        htmlFor={`permission-${permission.id}`}
                        className="ml-2"
                      >
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleCreateRole}>创建</Button>
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
            <TableHead>权限</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                {role.permissions.map((p) => p.name).join(', ')}
              </TableCell>
              <TableCell>
                {new Date(role.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedRole(role)}
                      >
                        查看
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>角色详情</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>
                          <strong>ID:</strong> {selectedRole?.id}
                        </p>
                        <p>
                          <strong>名称:</strong> {selectedRole?.name}
                        </p>
                        <p>
                          <strong>描述:</strong> {selectedRole?.description}
                        </p>
                        <p>
                          <strong>权限:</strong>
                        </p>
                        <ul className="list-disc list-inside">
                          {selectedRole?.permissions.map((p) => (
                            <li key={p.id}>{p.name}</li>
                          ))}
                        </ul>
                        <p>
                          <strong>创建时间:</strong>{' '}
                          {selectedRole?.createdAt &&
                            new Date(
                              selectedRole.createdAt
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteRole(role.id)}
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