/**
 * POST /api/sellers/apply
 * Submit a new seller onboarding application.
 * Returns the created application or a conflict error if the handle is taken.
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sellerApplicationSchema } from "@/lib/validations";
import { z } from "zod";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate
  const parsed = sellerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Ensure the full handle is unique (the UI strips "S-" prefix from user input)
  const handle = `S-${data.handle}`;

  try {
    const existing = await db.sellerApplication.findUnique({ where: { handle } });
    if (existing) {
      return NextResponse.json(
        { error: "That seller ID is already taken. Please choose another." },
        { status: 409 }
      );
    }

    const application = await db.sellerApplication.create({
      data: {
        ...data,
        handle,
        // Normalise empty strings to null for optional URL fields
        instagram: data.instagram || null,
        whatsapp: data.whatsapp || null,
        facebook: data.facebook || null,
        tiktok: data.tiktok || null,
        twitter: data.twitter || null,
        website: data.website || null,
        supportEmail: data.supportEmail || null,
        supportPhone: data.supportPhone || null,
        branchName: data.branchName || null,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/sellers/apply]", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
