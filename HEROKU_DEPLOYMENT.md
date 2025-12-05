# Deploying to Heroku

Heroku is a great platform for deploying this application. However, because Heroku uses an **ephemeral filesystem**, we **cannot use SQLite**. We must switch back to **PostgreSQL** for the production deployment.

## 📋 Prerequisites

1.  [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.
2.  Git installed and project initialized (`git init`).
3.  Heroku account.

---

## 🚀 Step 1: Prepare the Codebase

**Good news!** The project is now configured to **automatically detect** whether it's running locally (SQLite) or on Heroku (PostgreSQL).

You **do not** need to manually edit `schema.prisma`.

### 1. Verification
Ensure you have the following files in `backend/prisma/`:
- `schema.prisma` (Generated automatically)
- `schema.sqlite.prisma` (Source for local)
- `schema.postgresql.prisma` (Source for Heroku)

### 2. Commit Changes
```bash
git add .
git commit -m "Prepare for Heroku deployment"
```

---

## 🌍 Step 2: Create Heroku App

1.  **Login to Heroku:**
    ```bash
    heroku login
    ```

2.  **Create the App:**
    ```bash
    heroku create your-app-name-here
    ```

3.  **Add PostgreSQL Database:**
    Heroku provides a free Postgres tier.
    ```bash
    heroku addons:create heroku-postgresql:essential-0
    ```
    *This automatically sets the `DATABASE_URL` environment variable in Heroku.*

---

## ⚙️ Step 3: Configure Environment Variables

Set the necessary environment variables on Heroku:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set PROJECT_PATH=backend
```

---

## 🚀 Step 4: Deploy

1.  **Push to Heroku:**
    ```bash
    git push heroku main
    ```
    *(Or `git push heroku master` depending on your branch name)*

2.  **Run Database Migrations:**
    Once deployed, the app might fail to start because tables aren't created yet. Run this command:
    ```bash
    heroku run "cd backend && npx prisma db push"
    ```

---

## 🌐 Step 5: Frontend Deployment

For the best performance, we recommend deploying the **Frontend (Next.js)** to **Vercel**, as it's optimized for it.

**Please refer to [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed frontend deployment instructions including the critical "Root Directory" configuration.**

1.  Push your code to GitHub.
2.  Follow the steps in `VERCEL_DEPLOYMENT.md`.
3.  Set `NEXT_PUBLIC_API_URL` to your Heroku Backend URL (e.g., `https://your-app-name.herokuapp.com`).

**If you MUST deploy Frontend to Heroku too:**
You would need to configure the backend to serve the static frontend files, or create a second Heroku app specifically for the frontend.

---

## 🔄 Switching Between Dev (SQLite) and Prod (Postgres)

To keep developing locally with SQLite while deploying to Heroku with Postgres:

1.  Keep `schema.prisma` as `sqlite` locally.
2.  Before deploying, change it to `postgresql`.
3.  Or, maintain two schema files (`schema.sqlite.prisma` and `schema.postgres.prisma`) and swap them during the build process.
