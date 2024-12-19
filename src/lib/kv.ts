import { kv } from '@vercel/kv';

interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

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

interface Settings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  metaKeywords: string;
  metaDescription: string;
}

export const CATEGORIES_KEY = 'wonderchina_categories';
export const WEBSITES_KEY = 'wonderchina_websites';
export const SETTINGS_KEY = 'wonderchina_settings';

export async function getCategories(): Promise<Category[]> {
  return await kv.get<Category[]>(CATEGORIES_KEY) || [];
}

export async function setCategories(categories: Category[]): Promise<string> {
  return await kv.set(CATEGORIES_KEY, categories);
}

export async function getWebsites(): Promise<Website[]> {
  return await kv.get<Website[]>(WEBSITES_KEY) || [];
}

export async function setWebsites(websites: Website[]): Promise<string> {
  return await kv.set(WEBSITES_KEY, websites);
}

export async function getSettings(): Promise<Settings> {
  return await kv.get<Settings>(SETTINGS_KEY) || {
    siteName: '美丽中国',
    siteDescription: '发现中国之美，探索旅游胜地',
    siteLogo: '',
    favicon: '',
    metaKeywords: '中国旅游,景点导航,旅游攻略',
    metaDescription: '发现中国之美，探索旅游胜地。为您提供最全面的中国旅游景点导航。',
  };
}

export async function setSettings(settings: Settings): Promise<string> {
  return await kv.set(SETTINGS_KEY, settings);
} 