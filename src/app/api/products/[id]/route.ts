/**
 * GET /api/products/[id]
 * Returns a single product with its active prices and associated sellers.
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        prices: {
          where: { isActive: true },
          include: { seller: true },
          orderBy: { amount: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("[GET /api/products/[id]]", error);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}
