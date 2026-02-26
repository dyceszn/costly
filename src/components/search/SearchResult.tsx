import React from "react";
import { ChevronRight, Home } from "lucide-react"; // Assuming Lucide or similar
import { product, products } from "@/data/products";
import { price, prices } from "@/data/prices";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { Button } from "../ui/button";
import SearchSellerItem from "./SearchSellerItem";
import { sellers } from "@/data/sellers";
import { Popover, PopoverTrigger } from "../ui/popover";
import SearchTag from "./SearchTag";
import SearchTags from "./SearchTags";

interface SearchResultProps {
  id: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ id }) => {
  const [product, setProduct] = React.useState<product | null>(null);
  const [basePrice, setBasePrice] = React.useState<price | null>(null);
  const [showSellers, setShowSellers] = React.useState(false);

  const pricesWithSellers = prices.filter(
    (price) => price.productId === id && price.sellerId,
  );

  React.useEffect(() => {
    products.forEach((product) => {
      if (product.id === id) {
        setProduct(product);
      }
    });

    prices
      .filter((price) => price.productId === id && price.isActive)
      .forEach((price) => {
        if (price.basePrice) {
          setBasePrice(price);
        }
      });
  }, [id]);
  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      {/* Label - Muted and small */}
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
        Found Result
      </p>

      <div className="group border border-border rounded-2xl p-6 bg-card hover:border-brand-primary/50 transition-all duration-300">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* 1. Name: The clear visual anchor */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-semibold tracking-tight text-text-1">
              {product?.name}
              <span className="block text-sm font-normal text-text-2 mt-1">
                {product?.description}
              </span>
            </h3>
          </div>

          {/* 2. Price & Date: Balanced metadata */}
          <div className="md:col-span-3 flex md:justify-center">
            <div className="flex flex-col items-start md:items-center">
              <span className="text-2xl font-light tracking-tighter text-text-1">
                ₦{basePrice?.amount.toFixed(2) || "0.00"}
              </span>
              <span className="text-[10px] text-text-2 uppercase tracking-wide">
                Verified{" "}
                {basePrice?.updatedAt
                  ? new Date(basePrice?.updatedAt || "").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "N/A"}
                {/* {price?.updatedAt
                  ? new Intl.DateTimeFormat("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }).format(new Date(price?.updatedAt || ""))
                  : "N/A"} */}
              </span>
            </div>
          </div>

          {/* 3. Action: Clear but refined */}
          <button
            className="md:col-span-3 flex justify-end cursor-pointer"
            onClick={() => setShowSellers((prev) => !prev)}
          >
            <span className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all">
              Find a seller
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* 4. Secondary Action: Tucked away */}
      <div className="flex justify-end px-2">
        <button className="text-[11px] text-text-2 hover:text-text-1 transition-colors flex gap-1 items-center">
          Price looking wrong?
          <span className="underline underline-offset-2 decoration-brand-primary/30 hover:decoration-brand-primary">
            Improve accuracy
          </span>
        </button>
      </div>
      {showSellers && (
        <div className="flex flex-col gap-6">
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold px-1 ">
            Sellers
          </p>
          {pricesWithSellers.length > 0 && <SearchTags />}
          <div>
            {pricesWithSellers.length > 0 ? (
              pricesWithSellers.map((price) => {
                const seller = sellers.find((s) => s.id === price.sellerId);
                if (seller) {
                  return (
                    <SearchSellerItem
                      key={price.id}
                      seller={seller}
                      price={price.amount}
                    />
                  );
                }
                return null;
              })
            ) : (
              <div className="p-4 text-center text-text-2">
                No sellers found for this product.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
