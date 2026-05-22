import React from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export const PRODUCT_CATEGORIES = [
  "Food", "Beverage", "Electronics", "Personal Care", "Health",
  "Household", "Baby", "Dairy", "Snacks", "Other",
];

export const COMMON_TAGS = [
  "noodles", "rice", "pasta", "oil", "sugar", "water", "drink", "milk",
  "phone", "laptop", "accessories", "soap", "toothpaste", "lotion",
  "detergent", "diapers", "snacks", "coffee", "tea", "chips",
];

export interface SingleLogData {
  category: string;
  productName: string;
  price: string;
  tags: string[];
}

interface SingleInputSetProps {
  data: SingleLogData;
  onChange: (patch: Partial<SingleLogData>) => void;
}

const inputBase =
  "text-center h-12 bg-white border placeholder:text-center placeholder:text-xs md:placeholder:text-sm";

const SingleInputSet: React.FC<SingleInputSetProps> = ({ data, onChange }) => {
  const [tagInput, setTagInput] = React.useState("");

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !data.tags.includes(t)) {
      onChange({ tags: [...data.tags, t] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    onChange({ tags: data.tags.filter((t) => t !== tag) });

  return (
    <div className="grid md:grid-cols-3 grid-rows-2 gap-x-4 gap-y-4 w-full">
      {/* Category */}
      <Field className="col-span-full">
        <FieldLabel className="hidden">Category</FieldLabel>
        <select
          value={data.category}
          onChange={(e) => onChange({ category: e.target.value })}
          required
          className="text-center h-12 w-full bg-white border rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring text-text-primary"
        >
          <option value="" disabled>
            Select category
          </option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      {/* Product name */}
      <Field className="md:col-span-2">
        <FieldLabel className="hidden">Product name</FieldLabel>
        <Input
          placeholder="Product name"
          value={data.productName}
          onChange={(e) => onChange({ productName: e.target.value })}
          required
          className={inputBase}
        />
      </Field>

      {/* Price */}
      <Field className="col-span-1">
        <FieldLabel className="hidden">Price (₦)</FieldLabel>
        <Input
          type="number"
          placeholder="Price (₦)"
          value={data.price}
          onChange={(e) => onChange({ price: e.target.value })}
          min={1}
          required
          className={inputBase}
        />
      </Field>

      {/* Tags */}
      <Field className="col-span-full">
        <FieldLabel className="hidden">Tags</FieldLabel>
        <div className="min-h-12 bg-white border rounded-lg px-3 py-2 flex flex-wrap gap-1.5 items-center focus-within:ring-1 focus-within:ring-ring">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary text-[10px] font-semibold uppercase tracking-wide rounded-full px-2.5 py-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 transition-colors leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder={
              data.tags.length === 0
                ? "Add tags (press Enter or comma to add)"
                : "Add more tags…"
            }
            className="flex-1 min-w-24 bg-transparent text-xs outline-none placeholder:text-text-muted text-center"
          />
        </div>
        {/* Quick-add popular tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {COMMON_TAGS.filter((t) => !data.tags.includes(t))
            .slice(0, 8)
            .map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="text-[9px] text-text-muted hover:text-brand-primary uppercase tracking-wide transition-colors"
              >
                +{tag}
              </button>
            ))}
        </div>
      </Field>
    </div>
  );
};

export default SingleInputSet;
