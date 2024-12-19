import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-primary/10">
      <div className="flex items-center gap-3 mb-3">
        {category.icon && (
          <div className="text-2xl text-primary">{category.icon}</div>
        )}
        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
          {category.name}
        </h3>
      </div>
      <p className="text-primary/70 text-sm">
        {category.description}
      </p>
    </div>
  );
} 