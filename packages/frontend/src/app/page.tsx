import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  // 如果需要自动重定向到登录页面，取消下面这行的注释
  // redirect('/login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            轻语
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            现代化的后台管理系统
          </p>
        </div>
        
        {/* 添加导航链接 */}
        <div className="mt-8 space-y-4">
          <Link 
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            登录
          </Link>
          <Link
            href="/register"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            注册
          </Link>
        </div>
      </div>
    </div>
  );
}