'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InitPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleInit = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/init', {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error || '初始化失败');
        return;
      }

      setMessage('初始化成功！正在跳转...');
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch {
      setMessage('初始化失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            系统初始化
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            首次使用需要初始化管理员账号
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleInit}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? '初始化中...' : '开始初始化'}
          </button>
          {message && (
            <p className={`text-center text-sm ${
              message.includes('成功') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 