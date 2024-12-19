'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

const STORAGE_KEY = 'wonderchina_categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedCategories = localStorage.getItem(STORAGE_KEY);
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories);
      // 确保按 order 排序
      setCategories(parsed.sort((a: Category, b: Category) => a.order - b.order));
    }
  }, []);

  // 保存数据到 localStorage
  const saveCategories = (newCategories: Category[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCategories));
    setCategories(newCategories);
  };

  // 添加分类
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const data = await response.json();
        // 更新本地存储和状态
        const newCategories = [...categories, data];
        saveCategories(newCategories);
        // 重置表单
        setNewCategory({ name: '', description: '' });
        // 关闭模态框
        setIsAddModalOpen(false);
      } else {
        const error = await response.json();
        alert(error.message || '添加分类失败');
      }
    } catch (error) {
      console.error('添加分类失败:', error);
      alert('添加分类失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 编辑分类
  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setIsLoading(true);

    try {
      // 更新本地存储和状态
      const newCategories = categories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      );
      saveCategories(newCategories);
      // 关闭模态框
      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('更新分类失败:', error);
      alert('更新分类失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除分类
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('确定要删除这个分类吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 更新本地存储和状态
        const newCategories = categories.filter(c => c.id !== id)
          .map((c, index) => ({ ...c, order: index }));
        saveCategories(newCategories);
      } else {
        const error = await response.json();
        alert(error.message || '删除分类失败');
      }
    } catch (error) {
      console.error('删除分类失败:', error);
      alert('删除分类失败，请重试');
    }
  };

  // 移动分类位置
  const handleMove = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // 交换位置
    [newCategories[index], newCategories[targetIndex]] = 
    [newCategories[targetIndex], newCategories[index]];
    
    // 更新顺序
    const updatedCategories = newCategories.map((c, i) => ({
      ...c,
      order: i
    }));
    
    saveCategories(updatedCategories);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          添加分类
        </button>
      </div>

      {/* 分类列表 */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={category.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleMove(category.id, 'up')}
                        disabled={index === 0}
                      >
                        ▲
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleMove(category.id, 'down')}
                        disabled={index === categories.length - 1}
                      >
                        ▼
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setEditingCategory(category);
                        setIsEditModalOpen(true);
                      }}
                    >
                      编辑
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-center text-gray-500">
              暂无分类数据
            </li>
          )}
        </ul>
      </div>

      {/* 添加分类模态框 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">添加分类</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类名称
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类描述
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
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

      {/* 编辑分类模态框 */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">编辑分类</h2>
            <form onSubmit={handleEditCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类名称
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类描述
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
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