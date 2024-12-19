"use client";

import { CategoryTag } from "@/components/ui/CategoryTag";
import { WebsiteCard } from "@/components/ui/WebsiteCard";
import { Category, Website } from "@/types";
import { useState } from "react";

interface CategoryFilterProps {
  categories: Category[];
  websites: Website[];
}

export function CategoryFilter({ categories, websites }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredWebsites = websites.filter(
    (website) => activeCategory === "all" || website.categoryId === activeCategory
  );

  return (
    <>
      {/* 分类导航区域 */}
      <nav className="mb-12 overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {categories.map((category) => (
            <CategoryTag
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </nav>

      {/* 网站展示区域 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </section>
    </>
  );
} 