import { kv } from '@vercel/kv';

export const CATEGORIES_KEY = 'wonderchina_categories';
export const WEBSITES_KEY = 'wonderchina_websites';
export const SETTINGS_KEY = 'wonderchina_settings';

export async function getCategories() {
  return await kv.get(CATEGORIES_KEY) || [];
}

export async function setCategories(categories: any[]) {
  return await kv.set(CATEGORIES_KEY, categories);
}

export async function getWebsites() {
  return await kv.get(WEBSITES_KEY) || [];
}

export async function setWebsites(websites: any[]) {
  return await kv.set(WEBSITES_KEY, websites);
}

export async function getSettings() {
  return await kv.get(SETTINGS_KEY) || {
    siteName: '美丽中国',
    siteDescription: '发现中国之美，探索旅游胜地',
    siteLogo: '',
    favicon: '',
    metaKeywords: '中国旅游,景点导航,旅游攻略',
    metaDescription: '发现中国之美，探索旅游胜地。为您提供最全面的中国旅游景点导航。',
  };
}

export async function setSettings(settings: any) {
  return await kv.set(SETTINGS_KEY, settings);
} 