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
import { Switch } from '@/components/ui/switch';
import { api } from '@/lib/api';

// 定义设置类型
interface Setting {
  key: string;
  value: string;
  description: string;
  isPublic: boolean;
}

// 系统设置页面组件
export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSetting, setSelectedSetting] = useState<Setting | null>(null);
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    description: '',
    isPublic: false,
  });

  // 获取设置列表
  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await api.get<Setting[]>('/settings');
      setSettings(data);
    } catch (error) {
      toast({
        title: '错误',
        description: '获取设置列表失败',
        variant: 'destructive',
      });
    }
  };

  // 创建新设置
  const handleCreateSetting = async () => {
    try {
      await api.post('/settings', newSetting);
      toast({
        title: '成功',
        description: '设置已创建',
      });
      fetchSettings();
      setNewSetting({
        key: '',
        value: '',
        description: '',
        isPublic: false,
      });
    } catch (error) {
      toast({
        title: '错误',
        description: '创建设置失败',
        variant: 'destructive',
      });
    }
  };

  // 更新设置
  const handleUpdateSetting = async (setting: Setting) => {
    try {
      await api.put(`/settings/${setting.key}`, setting);
      toast({
        title: '成功',
        description: '设置已更新',
      });
      fetchSettings();
    } catch (error) {
      toast({
        title: '错误',
        description: '更新设置失败',
        variant: 'destructive',
      });
    }
  };

  // 删除设置
  const handleDeleteSetting = async (key: string) => {
    try {
      await api.delete(`/settings/${key}`);
      toast({
        title: '成功',
        description: '设置已删除',
      });
      fetchSettings();
    } catch (error) {
      toast({
        title: '错误',
        description: '删除设置失败',
        variant: 'destructive',
      });
    }
  };

  // 过滤设置列表
  const filteredSettings = settings.filter(
    (setting) =>
      setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">系统设置</h1>
        <Button onClick={() => router.push('/dashboard')}>返回仪表板</Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="搜索设置..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>创建设置</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新设置</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="key">键名</Label>
                <Input
                  id="key"
                  value={newSetting.key}
                  onChange={(e) =>
                    setNewSetting({ ...newSetting, key: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="value">值</Label>
                <Input
                  id="value"
                  value={newSetting.value}
                  onChange={(e) =>
                    setNewSetting({ ...newSetting, value: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">描述</Label>
                <Input
                  id="description"
                  value={newSetting.description}
                  onChange={(e) =>
                    setNewSetting({
                      ...newSetting,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublic"
                  checked={newSetting.isPublic}
                  onCheckedChange={(checked) =>
                    setNewSetting({ ...newSetting, isPublic: checked })
                  }
                />
                <Label htmlFor="isPublic">公开</Label>
              </div>
              <Button onClick={handleCreateSetting}>创建</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>键名</TableHead>
            <TableHead>值</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>公开</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSettings.map((setting) => (
            <TableRow key={setting.key}>
              <TableCell>{setting.key}</TableCell>
              <TableCell>{setting.value}</TableCell>
              <TableCell>{setting.description}</TableCell>
              <TableCell>
                <Switch
                  checked={setting.isPublic}
                  onCheckedChange={(checked) =>
                    handleUpdateSetting({ ...setting, isPublic: checked })
                  }
                />
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedSetting(setting)}
                      >
                        编辑
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>编辑设置</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>键名</Label>
                          <p className="text-sm text-gray-500">
                            {selectedSetting?.key}
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="edit-value">值</Label>
                          <Input
                            id="edit-value"
                            value={selectedSetting?.value || ''}
                            onChange={(e) =>
                              setSelectedSetting(
                                selectedSetting
                                  ? {
                                      ...selectedSetting,
                                      value: e.target.value,
                                    }
                                  : null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">描述</Label>
                          <Input
                            id="edit-description"
                            value={selectedSetting?.description || ''}
                            onChange={(e) =>
                              setSelectedSetting(
                                selectedSetting
                                  ? {
                                      ...selectedSetting,
                                      description: e.target.value,
                                    }
                                  : null
                              )
                            }
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="edit-isPublic"
                            checked={selectedSetting?.isPublic || false}
                            onCheckedChange={(checked) =>
                              setSelectedSetting(
                                selectedSetting
                                  ? {
                                      ...selectedSetting,
                                      isPublic: checked,
                                    }
                                  : null
                              )
                            }
                          />
                          <Label htmlFor="edit-isPublic">公开</Label>
                        </div>
                        <Button
                          onClick={() =>
                            selectedSetting && handleUpdateSetting(selectedSetting)
                          }
                        >
                          保存
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteSetting(setting.key)}
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