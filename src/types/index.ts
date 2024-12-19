export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface Website {
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

export interface Settings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  favicon: string;
  metaKeywords: string;
  metaDescription: string;
} 