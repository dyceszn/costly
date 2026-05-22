"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import SearchSellerItem from "./SearchSellerItem";
import { Seller } from "@/data/sellers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Field, FieldDescription } from "../ui/field";
import CustomButton from "../shared/CustomButton";

// Shape returned by GET /api/products/[id]
interface ApiSeller {
  id: string;
  handle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  branchName: string | null;
  name: string;
  searchableName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  supportEmail: string | null;
  supportPhone: string | null;
  website: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  tiktok: string | null;
  whatsapp: string | null;
  isVerified: boolean;
  verifiedAt: string | null;
  trustScore: number;
}

interface ApiPrice {
  id: string;
  amount: number;
  currency: string;
  basePrice: boolean;
  updatedAt: string;
  seller: ApiSeller | null;
}

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  prices: ApiPrice[];
}

// Transform the flat API seller shape into the nested Seller type
// that SearchSellerItem expects
function toSellerType(s: ApiSeller): Seller {
  return {
    id: s.id,
    handle: s.handle,
    representative: {
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      phone: s.phone,
    },
    category: s.category as "vendor" | "store",
    branchName: s.branchName ?? undefined,
    name: s.name,
    searchableName: s.searchableName,
    address: s.address,
    city: s.city,
    state: s.state,
    country: s.country,
    channels: {
      supportEmail: s.supportEmail ?? undefined,
      supportPhone: s.supportPhone ?? undefined,
      website: s.website ?? undefined,
      facebook: s.facebook ?? undefined,
      twitter: s.twitter ?? undefined,
      instagram: s.instagram ?? undefined,
      tiktok: s.tiktok ?? undefined,
      whatsapp: s.whatsapp ?? undefined,
    },
    verification: {
      isVerified: s.isVerified,
      verifiedAt: s.verifiedAt ?? "",
      trustScore: s.trustScore,
    },
    createdAt: "",
    updatedAt: "",
  };
}

interface SearchResultProps {
  id: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ id }) => {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSellers, setShowSellers] = useState(false);

  // "Improve accuracy" dialog state
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [correctionNote, setCorrectionNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [correctionSuccess, setCorrectionSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Product not found");
        return r.json();
      })
      .then((data) => setProduct(data.product))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const basePrice = product?.prices.find((p) => p.basePrice);
  const sellerPrices = product?.prices.filter((p) => p.seller) ?? [];

  const handleCorrectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(suggestedPrice);
    if (!price || price <= 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/logs/correction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, suggestedPrice: price, note: correctionNote }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setCorrectionSuccess(true);
      setTimeout(() => { setCorrectionOpen(false); setCorrectionSuccess(false); }, 2000);
    } catch {
      // keep dialog open, let user retry
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full mx-auto flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
          Loading…
        </p>
        <div className="border border-border rounded-2xl p-6 bg-card animate-pulse h-24" />
      </div>
    );
  }

  // ── Error / not found state ────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="w-full mx-auto flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
          Not Found
        </p>
        <div className="border border-border rounded-2xl p-6 bg-card text-center text-text-2 text-sm">
          {error ?? "This product could not be found."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      {/* Label */}
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-2 font-bold px-1">
        Found Result
      </p>

      <div className="group border border-border rounded-2xl p-6 bg-card hover:border-brand-primary/50 transition-all duration-300">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Name */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-semibold tracking-tight text-text-1">
              {product.name}
              <span className="block text-sm font-normal text-text-2 mt-1">
                {product.description}
              </span>
            </h3>
          </div>

          {/* Price & date */}
          <div className="md:col-span-3 flex md:justify-center">
            <div className="flex flex-col items-start md:items-center">
              <span className="text-2xl font-light tracking-tighter text-text-1">
                ₦{basePrice ? basePrice.amount.toLocaleString() : "—"}
              </span>
              <span className="text-[10px] text-text-2 uppercase tracking-wide">
                Verified{" "}
                {basePrice
                  ? new Date(basePrice.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Find a seller */}
          <button
            className="md:col-span-3 flex justify-end cursor-pointer"
            onClick={() => setShowSellers((prev) => !prev)}
          >
            <span className="flex items-center gap-1 text-sm font-medium text-brand-primary hover:gap-2 transition-all">
              {showSellers ? "Hide sellers" : "Find a seller"}
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${showSellers ? "rotate-90" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Improve accuracy */}
      <div className="flex justify-end px-2">
        <button
          className="text-[11px] text-text-2 hover:text-text-1 transition-colors flex gap-1 items-center"
          onClick={() => setCorrectionOpen(true)}
        >
          Price looking wrong?{" "}
          <span className="underline underline-offset-2 decoration-brand-primary/30 hover:decoration-brand-primary">
            Improve accuracy
          </span>
        </button>
      </div>

      {/* Sellers list */}
      {showSellers && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold px-1">
            Sellers ({sellerPrices.length})
          </p>
          <div>
            {sellerPrices.length > 0 ? (
              sellerPrices.map((priceEntry) =>
                priceEntry.seller ? (
                  <SearchSellerItem
                    key={priceEntry.id}
                    seller={toSellerType(priceEntry.seller)}
                    price={priceEntry.amount}
                  />
                ) : null
              )
            ) : (
              <div className="p-4 text-center text-text-2 text-sm">
                No sellers found for this product.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Improve accuracy dialog */}
      <Dialog open={correctionOpen} onOpenChange={setCorrectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suggest a price correction</DialogTitle>
            <DialogDescription>
              Help keep Costly accurate. Your suggestion will be reviewed and
              considered for verification.
            </DialogDescription>
          </DialogHeader>

          {correctionSuccess ? (
            <p className="text-center text-sm text-brand-primary py-4">
              ✓ Thank you! Your correction has been submitted.
            </p>
          ) : (
            <form onSubmit={handleCorrectionSubmit} className="flex flex-col gap-4">
              <Field>
                <Input
                  type="number"
                  placeholder="Your suggested price (₦)"
                  value={suggestedPrice}
                  onChange={(e) => setSuggestedPrice(e.target.value)}
                  min={1}
                  required
                  className="h-12 bg-white border text-center placeholder:text-xs"
                />
              </Field>
              <Field>
                <Input
                  type="text"
                  placeholder="Optional note (e.g. seen at Shoprite, Ikeja)"
                  value={correctionNote}
                  onChange={(e) => setCorrectionNote(e.target.value)}
                  className="h-12 bg-white border text-center placeholder:text-xs"
                />
                <FieldDescription className="text-xs">
                  Where did you see this price?
                </FieldDescription>
              </Field>
              <DialogFooter>
                <CustomButton
                  text={submitting ? "Submitting…" : "Submit correction"}
                  type="submit"
                  disabled={submitting}
                />
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResult;
