# Costly – The Price Advantage

Costly is a market-intelligence and price-mapping platform that aggregates product pricing data across sellers to uncover price inefficiencies and improve procurement transparency. It combines structured product search, seller verification, and private & crowdsourced price intelligence to help consumers and businesses make data-driven purchasing decisions.. Built with Next.js, PostgreSQL (Prisma), Zod validation, and Tailwind CSS.

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

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your database URL:

```env
# Local PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/costly"

# Supabase (production)
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### 3. Create the database (local)

In pgAdmin 17 (or psql), create a database named `costly`:

```sql
CREATE DATABASE costly;
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

This creates all tables (`Product`, `Seller`, `Price`, `SellerApplication`, `PriceLog`).

### 5. Seed with sample data

```bash
npx prisma db seed
```

Seeds 40 products, 15 sellers, and 50 prices from `src/data/`.

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
