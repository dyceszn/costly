# Costly

### _Price intelligence for a more transparent market._

Costly is a market intelligence and price mapping platform that aggregates real-world product pricing across sellers to expose inefficiencies, improve transparency, and enable smarter purchasing decisions.

It combines structured product search, seller verification, and crowd + private price intelligence to give both consumers and businesses a clearer view of the market.

Built with **Next.js**, **PostgreSQL (Prisma)**, **Zod**, and **Tailwind CSS**.

---

## What Costly does

Costly helps you answer one simple question:

> _“How much does this actually cost?”_

- Aggregates pricing across multiple sellers in real time

- Detects pricing gaps and inconsistencies

- Builds structured product intelligence from unstructured data

- Enables crowdsourced + verified price submissions

- Supports both consumer insight and procurement decisions

---

## Routes

| Route                 | Description                         |
| --------------------- | ----------------------------------- |
| `/`                   | Home                                |
| `/search`             | Search products                     |
| `/search/[id]`        | Product detail – prices and sellers |
| `/sellers/onboarding` | 4-step seller application wizard    |
| `/logs/entry`         | Single and batch price submission   |

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (local via pgAdmin 17, or Supabase for production)

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd costly
npm install
```

Note: `npm install` runs `prisma generate` via the `postinstall` script, but you can run `npx prisma generate` manually if needed.

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set a single `DATABASE_URL`. For local Postgres:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/costly"
```

If using Supabase, copy the project URI from the dashboard and percent-encode any special characters in the password. Ensure only one `DATABASE_URL` line is active in `.env`.

### 3. Create the database (local)

In pgAdmin 17 (or `psql`), create a database named `costly`:

```sql
CREATE DATABASE costly;
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

Either way, this will create the tables: `Product`, `Seller`, `Price`, `SellerApplication`, and `PriceLog`.

### 5. Seed with sample data

Preferred (uses the project's `tsx` dev tool already installed):

```bash
npx tsx prisma/seed.ts
```

If you prefer to use Prisma's seeding flow, `npx prisma db seed` will run the command configured in `package.json` (`ts-node ... prisma/seed.ts`). If `ts-node` is not available you can either install it (`npm install -D ts-node`) or use the `npx tsx prisma/seed.ts` command above.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Routes

| Method | Path                                | Description                          |
| ------ | ----------------------------------- | ------------------------------------ |
| `GET`  | `/api/products?q=&category=&limit=` | Search products                      |
| `GET`  | `/api/products/[id]`                | Product detail with prices + sellers |
| `POST` | `/api/sellers/apply`                | Submit seller onboarding application |
| `POST` | `/api/logs`                         | Submit single or batch price log     |
| `POST` | `/api/logs/correction`              | Submit a price correction suggestion |

### Batch price log body

```json
{
  "entries": [
    {
      "productName": "Indomie 70g",
      "price": 350,
      "category": "Food",
      "tags": ["noodles"]
    }
  ],
  "sellerId": "S-mystore"
}
```

---

## Production (Supabase)

1. Create a Supabase project.
2. Copy the connection string from **Project Settings → Database → Connection string → URI**.
3. Set `DATABASE_URL` to the Supabase URI in your production env.
4. Run `npx prisma migrate deploy` to apply migrations.
5. Run `npx prisma db seed` to populate initial data.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL via Prisma ORM
- **Validation**: Zod
- **UI**: Tailwind CSS, shadcn/ui-style primitives
- **File parsing**: PapaParse (CSV), SheetJS/xlsx (Excel)
- **Icons**: Lucide, @icons-pack/react-simple-icons
