'use client';

import { useState, useEffect } from 'react';

interface SystemSettings {
  // 基础信息
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  // SEO设置
  metaKeywords: string;
  metaDescription: string;
}

const SETTINGS_KEY = 'wonderchina_settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: '',
    siteDescription: '',
    siteLogo: '',
    favicon: '',
    metaKeywords: '',
    metaDescription: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // 加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 保存设置
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveStatus('saving');

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setSaveStatus('success');
      
      // 3秒后重置状态
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('保存设置失败:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理输入变化
  const handleChange = (field: keyof SystemSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
        <p className="mt-2 text-sm text-gray-600">
          在这里管理网站的基本信息和SEO设置
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基础信息设置 */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">基础信息设置</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                网站名称
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                网站描述
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                网站Logo URL
              </label>
              <input
                type="url"
                value={settings.siteLogo}
                onChange={(e) => handleChange('siteLogo', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="请输入Logo图片的URL地址"
              />
              {settings.siteLogo && (
                <img
                  src={settings.siteLogo}
                  alt="Logo预览"
                  className="mt-2 h-12 object-contain"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                网站图标(Favicon) URL
              </label>
              <input
                type="url"
                value={settings.favicon}
                onChange={(e) => handleChange('favicon', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="请输入favicon图标的URL地址"
              />
              {settings.favicon && (
                <img
                  src={settings.favicon}
                  alt="Favicon预览"
                  className="mt-2 h-8 w-8 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* SEO设置 */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">SEO设置</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta关键词
              </label>
              <input
                type="text"
                value={settings.metaKeywords}
                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="多个关键词用英文逗号分隔"
              />
              <p className="mt-1 text-sm text-gray-500">
                例如: 中国旅游,景点导航,旅游攻略
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta描述
              </label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="请输入网站的Meta描述，建议120字以内"
              />
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading
                ? 'bg-gray-400'
                : saveStatus === 'success'
                ? 'bg-green-600'
                : saveStatus === 'error'
                ? 'bg-red-600'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading
              ? '保存中...'
              : saveStatus === 'success'
              ? '保存成功'
              : saveStatus === 'error'
              ? '保存失败'
              : '保存设置'}
          </button>
        </div>
      </form>
    </div>
  );
} 