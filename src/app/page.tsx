import { CategoryFilter } from "@/components/CategoryFilter";
import { Category, Website } from "@/types";

// 测试数据
const categories: Category[] = [
  {
    id: "all",
    name: "全部",
    description: "所有分类",
    icon: "🏷️",
    order: 0,
  },
  {
    id: "literature",
    name: "文学艺术",
    description: "中国古典文学、现代文学、诗词歌赋等文学艺术网站",
    icon: "📚",
    order: 1,
  },
  {
    id: "history",
    name: "历史文化",
    description: "中国历史、考古发现、文物保护等历史文化网站",
    icon: "🏺",
    order: 2,
  },
  {
    id: "philosophy",
    name: "哲学思想",
    description: "中国传统哲学、儒释道等思想文化网站",
    icon: "🎭",
    order: 3,
  },
  {
    id: "art",
    name: "书画艺术",
    description: "中国书法、国画、篆刻等传统艺术网站",
    icon: "🖌️",
    order: 4,
  },
  {
    id: "architecture",
    name: "建筑园林",
    description: "中国古代建筑、园林设计、文化地标等建筑艺术网站",
    icon: "🏛️",
    order: 5,
  },
  {
    id: "folklore",
    name: "民俗文化",
    description: "中国传统节日、民间习俗、地方特色等民俗文化网站",
    icon: "🎭",
    order: 6,
  },
];

const websites: Website[] = [
  {
    id: "1",
    title: "中国诗词网",
    url: "https://www.shici.com",
    description: "收录了历代诗词名句，提供诗词鉴赏、创作园地等功能",
    categoryId: "literature",
    order: 1,
  },
  {
    id: "2",
    title: "国家图书馆",
    url: "http://www.nlc.cn",
    description: "中国国家图书馆官网，提供丰富的数字资源和文献服务",
    categoryId: "literature",
    order: 2,
  },
  {
    id: "3",
    title: "故宫博物院",
    url: "https://www.dpm.org.cn",
    description: "故宫博物院官方网站，展示中国传统文化艺术珍品",
    categoryId: "history",
    order: 1,
  },
  {
    id: "4",
    title: "孔子博物馆",
    url: "http://www.konfucius.com",
    description: "展示孔子及儒家文化的专业博物馆网站",
    categoryId: "philosophy",
    order: 1,
  },
  {
    id: "5",
    title: "中国书法网",
    url: "http://www.shufazidian.com",
    description: "中国书法艺术门户网站，提供书法教程、作品欣赏等资源",
    categoryId: "art",
    order: 1,
  },
  {
    id: "6",
    title: "中国园林网",
    url: "http://www.yuanlin.com",
    description: "展示中国传统园林艺术，提供园林设计、文化研究等内容",
    categoryId: "architecture",
    order: 1,
  },
  {
    id: "7",
    title: "中国非遗网",
    url: "https://www.ihchina.cn",
    description: "中国非物质文化遗产保护中心官方网站",
    categoryId: "folklore",
    order: 1,
  },
  {
    id: "8",
    title: "敦煌研究院",
    url: "https://www.dha.ac.cn",
    description: "敦煌文化研究和保护的权威机构网站",
    categoryId: "history",
    order: 2,
  },
  {
    id: "9",
    title: "中国国家博物馆",
    url: "http://www.chnmuseum.cn",
    description: "中国国家博物馆官方网站，展示中华文明发展历程",
    categoryId: "history",
    order: 3,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部区域 */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">中国文化之美</h1>
        <p className="text-lg text-primary/80">中国文化网站精选集</p>
      </header>

      {/* 主要内容区域 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <CategoryFilter categories={categories} websites={websites} />
      </main>

      {/* 页脚区域 */}
      <footer className="py-6 px-4 text-center text-primary/60 text-sm">
        <p>© 2024 中国文化之美 - 发现优质中国文化网站</p>
      </footer>
    </div>
  );
}
