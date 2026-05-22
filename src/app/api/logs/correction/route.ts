/**
 * POST /api/logs/correction
 * Submit a price correction suggestion for an existing product.
 * Stored as a PriceLog with source="correction".
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { priceCorrectionSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = priceCorrectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { productId, suggestedPrice, note, sellerId } = parsed.data;

  try {
    // Look up the product name for the log record
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const log = await db.priceLog.create({
      data: {
        productId,
        productName: product.name,
        price: suggestedPrice,
        category: product.category,
        tags: product.tags,
        sellerId: sellerId || null,
        currency: "NGN",
        source: "correction",
      },
    });

    return NextResponse.json({ log }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/logs/correction]", error);
    return NextResponse.json(
      { error: "Failed to submit correction" },
      { status: 500 }
    );
  }
}
