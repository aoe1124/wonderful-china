'use client';

import { useEffect, useState } from 'react';
import { CategoryFilter } from "@/components/CategoryFilter";
import { Category, Website } from "@/types";

const CATEGORIES_KEY = 'wonderchina_categories';
const WEBSITES_KEY = 'wonderchina_websites';
const SETTINGS_KEY = 'wonderchina_settings';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [settings, setSettings] = useState({
    siteName: '中国文化之美',
    siteDescription: '中国文化网站精选集'
  });

  useEffect(() => {
    // 加载分类
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      // 添加"全部"分类
      const allCategory: Category = {
        id: "all",
        name: "全部",
        description: "所有分类",
        order: -1
      };
      setCategories([allCategory, ...parsedCategories].sort((a, b) => a.order - b.order));
    }

    // 加载网站
    const savedWebsites = localStorage.getItem(WEBSITES_KEY);
    if (savedWebsites) {
      const parsedWebsites = JSON.parse(savedWebsites);
      setWebsites(parsedWebsites.sort((a, b) => a.order - b.order));
    }

    // 加载设置
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings({
        siteName: parsedSettings.siteName || '中国文化之美',
        siteDescription: parsedSettings.siteDescription || '中国文化网站精选集'
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部区域 */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">{settings.siteName}</h1>
        <p className="text-lg text-primary/80">{settings.siteDescription}</p>
      </header>

      {/* 主要内容区域 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <CategoryFilter categories={categories} websites={websites} />
      </main>

      {/* 页脚区域 */}
      <footer className="py-6 px-4 text-center text-primary/60 text-sm">
        <p>© {new Date().getFullYear()} {settings.siteName} - {settings.siteDescription}</p>
      </footer>
    </div>
  );
}
