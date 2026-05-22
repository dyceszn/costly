/**
 * POST /api/logs
 * Submit one or many price log entries.
 *
 * Body shapes accepted:
 *   Single:  { productName, price, category, tags, sellerId?, productId? }
 *   Batch:   { entries: [...], sellerId? }
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { priceLogSchema, batchPriceLogSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Detect batch vs single by presence of "entries" key
  const isBatch =
    body !== null &&
    typeof body === "object" &&
    "entries" in (body as object);

  if (isBatch) {
    const parsed = batchPriceLogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 422 }
      );
    }

    const { entries, sellerId } = parsed.data;

    try {
      // createMany is more efficient for bulk inserts
      const result = await db.priceLog.createMany({
        data: entries.map((e) => ({
          productId: e.productId || null,
          productName: e.productName,
          price: e.price,
          category: e.category,
          tags: e.tags,
          sellerId: sellerId || e.sellerId || null,
          currency: e.currency,
          source: sellerId ? "seller" : "user",
        })),
      });

      return NextResponse.json({ count: result.count }, { status: 201 });
    } catch (error) {
      console.error("[POST /api/logs] batch", error);
      return NextResponse.json(
        { error: "Failed to save price logs" },
        { status: 500 }
      );
    }
  } else {
    // Single entry
    const parsed = priceLogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 422 }
      );
    }

    const data = parsed.data;

    try {
      const log = await db.priceLog.create({
        data: {
          productId: data.productId || null,
          productName: data.productName,
          price: data.price,
          category: data.category,
          tags: data.tags,
          sellerId: data.sellerId || null,
          currency: data.currency,
          source: data.sellerId ? "seller" : "user",
        },
      });

      return NextResponse.json({ log }, { status: 201 });
    } catch (error) {
      console.error("[POST /api/logs] single", error);
      return NextResponse.json(
        { error: "Failed to save price log" },
        { status: 500 }
      );
    }
  }
}
