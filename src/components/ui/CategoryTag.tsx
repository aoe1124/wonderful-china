import { Category } from "@/types";

interface CategoryTagProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryTag({ category, isActive, onClick }: CategoryTagProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
        transition-all hover:scale-105
        ${isActive 
          ? 'bg-primary text-white' 
          : 'bg-secondary/50 text-primary border border-primary/20 hover:border-primary/40'
        }
      `}
    >
      {category.icon && <span className="text-base">{category.icon}</span>}
      <span className="font-medium">{category.name}</span>
    </button>
  );
} 