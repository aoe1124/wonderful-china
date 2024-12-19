export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
}

export interface Website {
  id: string;
  title: string;
  url: string;
  description: string;
  categoryId: string;
  icon?: string;
  order: number;
} 