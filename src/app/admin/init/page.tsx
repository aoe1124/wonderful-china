'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InitPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleInit = async () => {
    if (status === 'loading') return;
    
    setStatus('loading');
    try {
      const response = await fetch('/api/admin/init');
      const text = await response.text();
      
      if (response.ok) {
        setStatus('success');
        setMessage(text);
      } else {
        setStatus('error');
        setMessage(text);
      }
    } catch (error) {
      setStatus('error');
      setMessage('初始化失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          系统初始化
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          创建默认管理员账户
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {status === 'success' ? (
            <div className="space-y-6">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 whitespace-pre-line">
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/admin/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                前往登录
              </button>
            </div>
          ) : status === 'error' ? (
            <div className="space-y-6">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {message}
                    </h3>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push('/admin/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                前往登录
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-gray-500">
                点击下方按钮创建默认管理员账户：
                <br />
                用户名：admin
                <br />
                密码：admin123
              </p>
              <button
                onClick={handleInit}
                disabled={status === 'loading'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? '初始化中...' : '开始初始化'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 