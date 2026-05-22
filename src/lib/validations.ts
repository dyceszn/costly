/**
 * Shared Zod validation schemas used by both API routes and client forms.
 */
import { z } from "zod";

// ─── Seller Application ───────────────────────────────────────────────────────

export const sellerApplicationSchema = z.object({
  category: z.enum(["vendor", "store"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number"),
  businessName: z.string().min(1, "Business name is required"),
  branchName: z.string().optional(),
  country: z.string().default("Nigeria"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  // Channels (at least one must be provided)
  instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  whatsapp: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tiktok: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  supportEmail: z.string().email().optional().or(z.literal("")),
  supportPhone: z.string().optional(),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be at most 30 characters")
    .regex(/^[a-z0-9-]+$/, "Handle can only contain lowercase letters, numbers, and hyphens"),
});

export type SellerApplicationInput = z.infer<typeof sellerApplicationSchema>;

// ─── Price Log (single entry) ─────────────────────────────────────────────────

export const priceLogSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  sellerId: z.string().optional(),
  productId: z.string().optional(),
  currency: z.string().default("NGN"),
});

export type PriceLogInput = z.infer<typeof priceLogSchema>;

// ─── Batch Price Log ──────────────────────────────────────────────────────────

export const batchPriceLogSchema = z.object({
  entries: z.array(priceLogSchema).min(1, "At least one entry is required"),
  sellerId: z.string().optional(),
});

export type BatchPriceLogInput = z.infer<typeof batchPriceLogSchema>;

// ─── Price Correction (Improve accuracy) ─────────────────────────────────────

export const priceCorrectionSchema = z.object({
  productId: z.string().min(1),
  suggestedPrice: z.number().positive("Price must be a positive number"),
  note: z.string().optional(),
  sellerId: z.string().optional(),
});

export type PriceCorrectionInput = z.infer<typeof priceCorrectionSchema>;
