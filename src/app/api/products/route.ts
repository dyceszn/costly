/**
 * GET /api/products
 * Search products by name/tags/category.
 * Query params:
 *   q        – search term (matches name, searchableName, tags, description)
 *   category – exact category filter
 *   limit    – max results (default 20)
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 50);

  try {
    const products = await db.product.findMany({
      where: {
        AND: [
          // Full-text search across name, searchableName, description, and tags
          q
            ? {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { searchableName: { contains: q, mode: "insensitive" } },
                  { description: { contains: q, mode: "insensitive" } },
                  { tags: { hasSome: [q.toLowerCase()] } },
                ],
              }
            : {},
          // Category filter
          category ? { category: { equals: category, mode: "insensitive" } } : {},
        ],
      },
      include: {
        // Attach the active base price so the search list can display it
        prices: {
          where: { isActive: true, basePrice: true },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
      take: limit,
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
