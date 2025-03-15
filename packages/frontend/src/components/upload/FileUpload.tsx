// 导入必要的依赖
'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Upload, X } from 'lucide-react';

// 定义文件上传组件的属性
interface FileUploadProps {
  onUploadComplete?: (fileInfo: any) => void;
  maxSize?: number; // 单位：MB
  acceptedTypes?: string[];
}

// 文件上传组件
export function FileUpload({
  onUploadComplete,
  maxSize = 5, // 默认最大5MB
  acceptedTypes = ['image/*', 'application/pdf'],
}: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 处理文件上传
  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      toast({
        title: '成功',
        description: '文件上传成功',
      });
      onUploadComplete?.(data);
    } catch (error) {
      toast({
        title: '错误',
        description: '文件上传失败',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
    }
  };

  // 处理文件拖放
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: '错误',
        description: `文件大小不能超过 ${maxSize}MB`,
        variant: 'destructive',
      });
      return;
    }
    setSelectedFile(file);
  }, [maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxFiles: 1,
  });

  // 清除选中的文件
  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-md">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? '将文件放在这里...'
            : '拖放文件到这里，或点击选择文件'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          支持的文件类型: {acceptedTypes.join(', ')}
        </p>
        <p className="text-xs text-gray-500">
          最大文件大小: {maxSize}MB
        </p>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {selectedFile.name}
              </span>
              <span className="text-xs text-gray-500">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSelectedFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {uploading ? (
            <Progress value={uploadProgress} className="mt-2" />
          ) : (
            <Button
              className="w-full mt-2"
              onClick={() => handleUpload(selectedFile)}
            >
              上传文件
            </Button>
          )}
        </div>
      )}
    </div>
  );
}