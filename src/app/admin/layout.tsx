'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 导航菜单配置
const menuItems = [
  { name: '仪表盘', path: '/admin' },
  { name: '分类管理', path: '/admin/categories' },
  { name: '网站管理', path: '/admin/websites' },
  { name: '系统设置', path: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="px-4 text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">中国文化之美·后台管理</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="ml-4 px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-white shadow-sm`}>
          <nav className="mt-5 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <span className={`${!isSidebarOpen ? 'sr-only' : ''}`}>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 