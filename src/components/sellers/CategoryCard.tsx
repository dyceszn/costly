import React from "react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  selected = false,
  onClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={cn(
        "flex flex-col gap-8 items-center justify-center py-4 px-6 text-center border rounded-2xl cursor-pointer transition-all duration-200",
        selected
          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary/30"
          : "hover:bg-neutral-50"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
          selected ? "bg-brand-primary/10" : "bg-neutral-50"
        )}
      >
        {icon}
      </div>

      <div className="space-y-1">
        <p className="text-[13px] font-semibold tracking-tight">{title}</p>
        <p className="text-[11px] leading-relaxed text-text-muted max-w-55">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
