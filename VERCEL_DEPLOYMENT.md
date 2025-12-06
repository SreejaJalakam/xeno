# Deploying to Vercel (Simplified)

Since the project is now a **Monolithic Next.js Application** (with backend API routes built-in), deployment is extremely simple.

## Step 1: Push to GitHub
Ensure your latest changes are pushed.

## Step 2: Deploy Frontend Project
1.  Go to Vercel Dashboard -> **Add New...** -> **Project**.
2.  Import your repository.
3.  **Configure Project**:
    *   **Framework Preset**: **Next.js**.
    *   **Root Directory**: **IMPORTANT**: Click Edit and select `frontend`.
4.  **Environment Variables** (Expand this section):
    *   **Key**: `DATABASE_URL`
    *   **Value**: Your PostgreSQL Connection String.
    *   *Need a database?*
        *   **Neon (Recommended)**: Go to [neon.tech](https://neon.tech), create a free project, copy the "Connection String" (starts with `postgres://...`).
        *   **Supabase**: Go to [supabase.com](https://supabase.com), create project, go to Settings -> Database -> Connection String -> URI.
5.  **Deploy**.

That's it! The backend API routes will be deployed as serverless functions alongside your frontend.

### Configuring Cron Jobs (Ingestion)
1.  Go to your Vercel Project -> **Settings** -> **Cron Jobs**.
2.  Create a job for path: `/api/ingestion/trigger-all`.
3.  Schedule: `0 * * * *` (Hourly).
