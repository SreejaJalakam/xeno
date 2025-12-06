# 🎥 Xeno FDE Internship - Project Demo Script

**Target Duration:** ~5-7 Minutes
**Tone:** Professional, clear, and enthusiastic.

---

## 1. Introduction (0:00 - 0:45)
# 🎥 Xeno FDE Internship - Project Demo Script

**Target Duration:** ~5-7 Minutes
**Tone:** Professional, clear, and enthusiastic.

---

## 1. Introduction (0:00 - 0:45)
**Visual:** Face camera or Project Title Slide.

"Hi, I'm [Your Name], and this is my submission for the Xeno Forward Deployed Engineer Internship assignment.

I've built a **Multi-Tenant Shopify Data Ingestion & Insights Service**. The goal was to create a scalable system that can onboard multiple Shopify stores, ingest their data (Customers, Orders, Products), and provide actionable insights via a dashboard.

I implemented this using a **Node.js & Express backend**, a **Next.js frontend**, and **PostgreSQL**. The entire application is deployed on **Vercel**, utilizing their serverless infrastructure for scalability."

---

## 2. Platform Walkthrough (0:45 - 3:00)
**Visual:** Screen recording of the application.

### A. Tenant Registration (API)
**Action:** Show Postman or your terminal registering a new tenant.
"First, let's look at the onboarding flow. Since this is a backend-heavy service, I treat tenant registration as an API event. Here, I'm hitting the `/api/tenants/register` endpoint on my Vercel backend.
*Click Send* -> *Show 201 Created response*
"Great, we have a new Tenant ID. The system has securely stored the API keys and created a dedicated record for this store."

### B. Data Ingestion (The "Magic")
**Action:** Show the browser hitting `/api/ingestion/trigger-all` or Vercel Cron logs.
"For data ingestion, I leverage **Vercel Cron Jobs**. Given the serverless nature of the deployment, we trigger the ingestion pipeline via a scheduled API call.
Here, I manually trigger it: `/api/ingestion/trigger-all`.
It connects to the Shopify API for all tenants and performs an **idempotent upsert**. This ensures we never duplicate data, only update what's changed."

### C. The Dashboard
**Action:** Open your Vercel Frontend URL, enter Tenant ID, click Login.
"Now, let's log in to the Frontend.
Here is the **Insights Dashboard**.
*   **Top Cards:** Real-time metrics: Total Revenue, Orders, Customers.
*   **Visualizations:**
    *   **Revenue Trend** chart showing sales performance.
    *   **Top 5 Customers by Spend** to identify VIPs."

---

## 3. Code & Architecture Walkthrough (3:00 - 5:30)
**Visual:** VS Code / IDE.

### A. Backend Structure
**File:** `backend/src/server.ts` & `backend/api/index.ts`
"Let's dive into the code. I adopted a **Vercel-native approach**.
*   **`api/index.ts`**: This handles the serverless entry point.
*   **`services/ingestion.ts`**: The core logic using **Prisma ORM** for type-safe database interactions."

### B. Database Schema (Multi-Tenancy)
**File:** `backend/prisma/schema.prisma`
"For the database, I use **PostgreSQL** hosted on Neon/Supabase.
My schema enforces multi-tenancy strictly: every table (`Customer`, `Order`) has a `tenant_id`. Queries depend on this ID to ensure data isolation."

### C. Deployment Strategy
**File:** `VERCEL_DEPLOYMENT.md`
"I deployed this as two separate Vercel projects—one for the Frontend (Next.js) and one for the Backend. This decouples the UI from the API and allows independent scaling."

---

## 4. Conclusion (5:30 - 6:00)
**Visual:** Face camera or GitHub Repo.

"To wrap up, I've built a robust, production-ready service that meets all requirements:
1.  **Multi-tenancy** baked into the core.
2.  **Serverless Ingestion** adapted for Vercel.
3.  **Real-time Dashboard**.
4.  **Full Vercel Deployment** with automated CI/CD via GitHub.

I really enjoyed working on this challenge. Thank you for your time!"

---

## 📝 Quick File Reference (For your memory)

*   **`backend/api/index.ts`**: Vercel Serverless Entry.
*   **`backend/src/routes/ingestion.ts`**: Trigger endpoints for Cron.
*   **`backend/src/services/ingestion.ts`**: Shopify Sync Logic.
*   **`frontend/app/dashboard/page.tsx`**: Dashboard UI.
*   **`backend/prisma/schema.prisma`**: DB Schema.
