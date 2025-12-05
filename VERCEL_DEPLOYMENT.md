# Deploying Frontend to Vercel

The frontend of this project is a **Next.js** application located in the `frontend/` directory. 
By default, Vercel may try to deploy the root directory, which will result in a 404 error or a "No framework detected" warning.

## 🛠 Critical Configuration Step

You **must** configure Vercel to look for the application in the `frontend` folder.

### 1. Go to Project Settings
1.  Log in to your Vercel Dashboard.
2.  Click on your project (e.g., `xeno`).
3.  Click on the **Settings** tab at the top.

> **Note:** Make sure you are in the **Project Settings**, not your Team Settings. You should see "General", "Domains", "Integrations", etc., in the sidebar.

### 2. Update Root Directory
1.  In the **General** section, locate the **Root Directory** setting.
2.  Click **Edit**.
3.  Select `frontend` or type `frontend`.
4.  Click **Save**.

### 3. Redeploy
1.  Go to the **Deployments** tab.
2.  Find the most recent failed or static deployment.
3.  Click the three dots (`...`) next to it and select **Redeploy**.

## ✅ Verification
- Vercel should now detect **Next.js**.
- The build logs should show it entering the `frontend` directory.
- The deployment should succeed and render the dashboard.
