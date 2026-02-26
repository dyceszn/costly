import React from "react";

interface CategoryCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center py-4 px-6 text-center border rounded-2xl cursor-pointer hover:bg-neutral-50 transition-colors">
      <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50">
        {icon}
      </div>

      <div className="space-y-1">
        <p className="text-[13px] font-semibold tracking-tight">{title}</p>
        <p className="text-[11px] leading-relaxed text-text-muted max-w-55 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
