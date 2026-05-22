/**
 * Seed script – populates the database with the static sample data
 * from src/data/. Run with: npx prisma db seed
 */
import { db as prisma } from "../src/lib/db";
import { products } from "../src/data/products";
import { sellers } from "../src/data/sellers";
import { prices } from "../src/data/prices";

async function main() {
  console.log("🌱 Seeding database…");

  // ── Products ──────────────────────────────────────────────────────────────
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        barcode: p.barcode,
        name: p.name,
        searchableName: p.searchableName,
        description: p.description,
        category: p.category,
        tags: p.tags,
        updatedAt: new Date(p.updatedAt),
      },
      create: {
        id: p.id,
        barcode: p.barcode,
        name: p.name,
        searchableName: p.searchableName,
        description: p.description,
        category: p.category,
        tags: p.tags,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      },
    });
  }
  console.log(`  ✓ ${products.length} products`);

  // ── Sellers ───────────────────────────────────────────────────────────────
  for (const s of sellers) {
    await prisma.seller.upsert({
      where: { id: s.id },
      update: {
        handle: s.handle,
        firstName: s.representative.firstName,
        lastName: s.representative.lastName,
        email: s.representative.email,
        phone: s.representative.phone,
        category: s.category,
        branchName: s.branchName ?? null,
        name: s.name,
        searchableName: s.searchableName,
        address: s.address,
        city: s.city,
        state: s.state,
        country: s.country,
        supportEmail: s.channels.supportEmail ?? null,
        supportPhone: s.channels.supportPhone ?? null,
        website: s.channels.website ?? null,
        facebook: s.channels.facebook ?? null,
        twitter: s.channels.twitter ?? null,
        instagram: s.channels.instagram ?? null,
        tiktok: s.channels.tiktok ?? null,
        whatsapp: s.channels.whatsapp ?? null,
        isVerified: s.verification.isVerified,
        verifiedAt: s.verification.verifiedAt
          ? new Date(s.verification.verifiedAt)
          : null,
        trustScore: s.verification.trustScore,
        updatedAt: new Date(s.updatedAt),
      },
      create: {
        id: s.id,
        handle: s.handle,
        firstName: s.representative.firstName,
        lastName: s.representative.lastName,
        email: s.representative.email,
        phone: s.representative.phone,
        category: s.category,
        branchName: s.branchName ?? null,
        name: s.name,
        searchableName: s.searchableName,
        address: s.address,
        city: s.city,
        state: s.state,
        country: s.country,
        supportEmail: s.channels.supportEmail ?? null,
        supportPhone: s.channels.supportPhone ?? null,
        website: s.channels.website ?? null,
        facebook: s.channels.facebook ?? null,
        twitter: s.channels.twitter ?? null,
        instagram: s.channels.instagram ?? null,
        tiktok: s.channels.tiktok ?? null,
        whatsapp: s.channels.whatsapp ?? null,
        isVerified: s.verification.isVerified,
        verifiedAt: s.verification.verifiedAt
          ? new Date(s.verification.verifiedAt)
          : null,
        trustScore: s.verification.trustScore,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      },
    });
  }
  console.log(`  ✓ ${sellers.length} sellers`);

  // ── Prices ────────────────────────────────────────────────────────────────
  for (const p of prices) {
    await prisma.price.upsert({
      where: { id: p.id },
      update: {
        amount: p.amount,
        currency: p.currency,
        isActive: p.isActive,
        basePrice: p.basePrice ?? false,
        updatedAt: new Date(p.updatedAt),
      },
      create: {
        id: p.id,
        productId: p.productId,
        sellerId: p.sellerId ?? null,
        amount: p.amount,
        currency: p.currency,
        isActive: p.isActive,
        basePrice: p.basePrice ?? false,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      },
    });
  }
  console.log(`  ✓ ${prices.length} prices`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
