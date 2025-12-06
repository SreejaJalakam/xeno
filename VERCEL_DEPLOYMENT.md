# Deploying to Vercel

You will deploy this application as **two separate Vercel projects**: one for the frontend and one for the backend.

## Prerequisite: Database
Since Vercel is serverless, you need an external PostgreSQL database.
- Use **Neon**, **Supabase**, or **Railway** to get a Postgres Connection URL.
- Connection String format: `postgresql://user:password@host:port/dbname?sslmode=require`

---

## Part 1: Backend Deployment

1.  **Push your code to GitHub**.
2.  Go to Vercel Dashboard -> **Add New...** -> **Project**.
3.  Import your repository.
4.  **Configure Project**:
    *   **Framework Preset**: Select `Other` (or handle as Node.js).
    *   **Root Directory**: Click Edit -> Select `backend`.
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Install Command**: `npm install`
5.  **Environment Variables**:
    *   `DATABASE_URL`: Your Postgres connection string.
    *   `SHOPIFY_API_KEY`: (If needed global, otherwise tenants have it).
    *   `JWT_SECRET`: Random secret.
6.  **Deploy**.
7.  **Note the URL**: e.g., `https://start-shopify-backend.vercel.app`.

### Configuring Cron Jobs (Ingestion)
Since Vercel functions sleep, the background scheduler in `server.ts` won't run.
1.  Go to your Vercel Project -> **Settings** -> **Cron Jobs**.
2.  Create a job for path: `/api/ingestion/trigger-all`.
3.  Schedule: `0 * * * *` (Hourly) or `*/10 * * * *` (Every 10 mins).
    *   *Note*: Vercel Hobby plan allows 1 cron job per day. For demo, you can trigger it manually in browser: `https://your-backend.vercel.app/api/ingestion/trigger-all`.

---

## Part 2: Frontend Deployment

1.  Go to Vercel Dashboard -> **Add New...** -> **Project**.
2.  Import the **same repository** again.
3.  **Configure Project**:
    *   **Framework Preset**: **Next.js**.
    *   **Root Directory**: Click Edit -> Select `frontend`.
4.  **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: The URL of your **Backend** deployment (e.g., `https://start-shopify-backend.vercel.app`).
5.  **Deploy**.

## ✅ Verification
1.  Open your Frontend URL.
2.  Try to register a tenant (creates data in DB via Backend).
3.  Check Dashboard.
