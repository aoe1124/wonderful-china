'use client';

import { useState, useEffect } from 'react';

interface Website {
  id: string;
  title: string;
  url: string;
  description: string;
  categoryId: string;
  order: number;
  icon?: string;
  createTime: number;
  updateTime: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

const STORAGE_KEY = 'wonderchina_websites';
const CATEGORIES_KEY = 'wonderchina_categories';

export default function WebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [newWebsite, setNewWebsite] = useState({
    title: '',
    url: '',
    description: '',
    categoryId: '',
    icon: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // 加载数据
  useEffect(() => {
    // 加载分类数据
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories);
      setCategories(parsed.sort((a: Category, b: Category) => a.order - b.order));
    }

    // 加载网站数据
    const savedWebsites = localStorage.getItem(STORAGE_KEY);
    if (savedWebsites) {
      const parsed = JSON.parse(savedWebsites);
      setWebsites(parsed.sort((a: Website, b: Website) => a.order - b.order));
    }
  }, []);

  // 保存数据到 localStorage
  const saveWebsites = (newWebsites: Website[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWebsites));
    setWebsites(newWebsites);
  };

  // 添加网站
  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const now = Date.now();
      const newSite: Website = {
        id: now.toString(),
        ...newWebsite,
        order: websites.length,
        createTime: now,
        updateTime: now,
      };

      const newWebsites = [...websites, newSite];
      saveWebsites(newWebsites);
      
      // 重置表单
      setNewWebsite({
        title: '',
        url: '',
        description: '',
        categoryId: '',
        icon: '',
      });
      // 关闭模态框
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('添加网站失败:', error);
      alert('添加网站失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 编辑网站
  const handleEditWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWebsite) return;
    setIsLoading(true);

    try {
      const updatedWebsite = {
        ...editingWebsite,
        updateTime: Date.now(),
      };

      const newWebsites = websites.map(w => 
        w.id === updatedWebsite.id ? updatedWebsite : w
      );
      saveWebsites(newWebsites);
      
      // 关闭模态框
      setIsEditModalOpen(false);
      setEditingWebsite(null);
    } catch (error) {
      console.error('更新网站失败:', error);
      alert('更新网站失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除网站
  const handleDeleteWebsite = async (id: string) => {
    if (!confirm('确定要删除这个网站吗？')) {
      return;
    }

    try {
      const newWebsites = websites.filter(w => w.id !== id)
        .map((w, index) => ({ ...w, order: index }));
      saveWebsites(newWebsites);
    } catch (error) {
      console.error('删除网站失败:', error);
      alert('删除网站失败，请重试');
    }
  };

  // 移动网站位置
  const handleMove = async (id: string, direction: 'up' | 'down') => {
    const index = websites.findIndex(w => w.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === websites.length - 1)
    ) {
      return;
    }

    const newWebsites = [...websites];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // 交换位置
    [newWebsites[index], newWebsites[targetIndex]] = 
    [newWebsites[targetIndex], newWebsites[index]];
    
    // 更新顺序
    const updatedWebsites = newWebsites.map((w, i) => ({
      ...w,
      order: i
    }));
    
    saveWebsites(updatedWebsites);
  };

  // 获取分类名称
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '未分类';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">网站管理</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          添加网站
        </button>
      </div>

      {/* 网站列表 */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {websites.length > 0 ? (
            websites.map((website, index) => (
              <li key={website.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleMove(website.id, 'up')}
                        disabled={index === 0}
                      >
                        ▲
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleMove(website.id, 'down')}
                        disabled={index === websites.length - 1}
                      >
                        ▼
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center">
                        {website.icon && (
                          <img 
                            src={website.icon} 
                            alt={website.title} 
                            className="h-6 w-6 mr-2"
                          />
                        )}
                        <h3 className="text-lg font-medium text-gray-900">
                          {website.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {website.description}
                      </p>
                      <div className="mt-1 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {getCategoryName(website.categoryId)}
                        </span>
                        <a 
                          href={website.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-indigo-600 hover:text-indigo-900"
                        >
                          访问网站
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setEditingWebsite(website);
                        setIsEditModalOpen(true);
                      }}
                    >
                      编辑
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteWebsite(website.id)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-center text-gray-500">
              暂无网站数据
            </li>
          )}
        </ul>
      </div>

      {/* 添加网站模态框 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">添加网站</h2>
            <form onSubmit={handleAddWebsite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站名称
                </label>
                <input
                  type="text"
                  value={newWebsite.title}
                  onChange={(e) => setNewWebsite({ ...newWebsite, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站地址
                </label>
                <input
                  type="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站描述
                </label>
                <textarea
                  value={newWebsite.description}
                  onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所属分类
                </label>
                <select
                  value={newWebsite.categoryId}
                  onChange={(e) => setNewWebsite({ ...newWebsite, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                >
                  <option value="">请选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站图标
                </label>
                <input
                  type="url"
                  value={newWebsite.icon}
                  onChange={(e) => setNewWebsite({ ...newWebsite, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="请输入图标URL（可选）"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isLoading}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? '添加中...' : '确定'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑网站模态框 */}
      {isEditModalOpen && editingWebsite && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">编辑网站</h2>
            <form onSubmit={handleEditWebsite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站名称
                </label>
                <input
                  type="text"
                  value={editingWebsite.title}
                  onChange={(e) => setEditingWebsite({ ...editingWebsite, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站地址
                </label>
                <input
                  type="url"
                  value={editingWebsite.url}
                  onChange={(e) => setEditingWebsite({ ...editingWebsite, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站描述
                </label>
                <textarea
                  value={editingWebsite.description}
                  onChange={(e) => setEditingWebsite({ ...editingWebsite, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所属分类
                </label>
                <select
                  value={editingWebsite.categoryId}
                  onChange={(e) => setEditingWebsite({ ...editingWebsite, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                >
                  <option value="">请选择分类</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站图标
                </label>
                <input
                  type="url"
                  value={editingWebsite.icon || ''}
                  onChange={(e) => setEditingWebsite({ ...editingWebsite, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="请输入图标URL（可选）"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingWebsite(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isLoading}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 