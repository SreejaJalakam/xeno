# Deployment Guide

This guide covers multiple deployment options for the Shopify Insights Platform.

## Table of Contents
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites
- Node.js v18 or higher
- PostgreSQL 12 or higher
- npm or yarn

### Step 1: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Ensure .env has: DATABASE_URL="file:./dev.db"

# Generate Prisma Client
npx prisma generate

# Create SQLite database
npx prisma db push

# Start development server
npm run dev
```

Backend will run on `http://localhost:4000`

### Step 3: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## Docker Deployment

### Prerequisites
- Docker Desktop or Docker Engine
- Docker Compose

### Quick Start
```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 4000
- Frontend on port 3000

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up --build -d
```

---

## Production Deployment

### Option 1: Cloud Platform (Vercel + Railway)

#### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
5. Deploy

#### Backend (Railway)
1. Create new project in Railway
2. Add PostgreSQL database
3. Deploy from GitHub
4. Set environment variables:
   - `DATABASE_URL`: (auto-configured)
   - `PORT`: 4000
5. Run migration: `npx prisma db push`

### Option 2: VPS (DigitalOcean, AWS EC2, etc.)

```bash
# Install Docker and Docker Compose on server
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone repository
git clone <your-repo-url>
cd shopify

# Configure production environment
cp backend/.env.example backend/.env
# Edit with production credentials

# Start services
docker-compose up -d

# Set up nginx reverse proxy (optional)
# Configure SSL with Let's Encrypt
```

### Option 3: Kubernetes
See `k8s/` directory for Kubernetes manifests (if needed).

---

## Environment Variables

### Backend (.env)
```env
# Server
PORT=4000

# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# Optional: For production
NODE_ENV=production
LOG_LEVEL=info
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U postgres -d shopify_ingestion

# Reset database
npx prisma db push --force-reset
```

### Port Already in Use
```bash
# Find process using port 4000
lsof -i :4000

# Kill process
kill -9 <PID>
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Frontend Not Connecting to Backend
1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running: `curl http://localhost:4000`
3. Check browser console for CORS errors
4. Ensure backend CORS is configured for frontend URL

---

## Health Checks

### Backend
```bash
curl http://localhost:4000
# Should return: "Shopify Ingestion Service API is running"
```

### Database
```bash
curl http://localhost:4000/api/tenants
# Should return: [] or list of tenants
```

### Frontend
Open `http://localhost:3000` in browser

---

## Monitoring & Logs

### Docker Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Application Logs
- Backend: Check console output
- Frontend: Check browser console and server logs

---

## Backup & Recovery

### Database Backup
```bash
# Backup
pg_dump shopify_ingestion > backup.sql

# Restore
psql shopify_ingestion < backup.sql
```

### Docker Volume Backup
```bash
docker run --rm -v shopify_postgres_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz /data
```

---

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Store Shopify credentials securely
3. **Database**: Use strong passwords
4. **HTTPS**: Always use SSL in production
5. **CORS**: Configure allowed origins properly
6. **Rate Limiting**: Implement in production
7. **Authentication**: Add proper auth before production use

---

## Performance Optimization

1. **Database Indexing**: Already configured in Prisma schema
2. **Caching**: Consider Redis for frequently accessed data
3. **CDN**: Use CDN for frontend assets
4. **Database Connection Pooling**: Configure in production
5. **Horizontal Scaling**: Use load balancer for multiple backend instances

---

## Next Steps

1. Set up monitoring (e.g., Sentry, LogRocket)
2. Configure CI/CD pipeline
3. Add automated testing
4. Set up staging environment
5. Configure backup automation
