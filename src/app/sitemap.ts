import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wonderchina.win'
  
  // 基础路由
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // TODO: 后续添加分类页面的 URL
  // const categories = await getCategories()
  // const categoryRoutes = categories.map(category => ({
  //   url: `${baseUrl}/category/${category.id}`,
  //   lastModified: new Date(category.updateTime),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  return routes
} 