# Quick Reference Guide

## 🎯 Project Overview
Multi-tenant Shopify data ingestion and analytics platform built with Node.js, Next.js, and PostgreSQL.

## ⚡ Quick Commands

### Docker (Easiest)
```bash
docker-compose up -d          # Start all services
docker-compose logs -f        # View logs
docker-compose down           # Stop services
```

### Backend
```bash
cd backend
npm install                   # Install dependencies
npx prisma generate          # Generate client
npx prisma db push           # Setup SQLite db
npm run dev                  # Start server (port 4000)
```

### Frontend
```bash
cd frontend
npm install                   # Install dependencies
npm run dev                  # Start app (port 3000)
```

## 📍 Important URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000

## 🔑 Environment Variables

**Backend (.env):**
```env
PORT=4000
DATABASE_URL="file:./dev.db"
```

## 📝 First Steps After Setup

1. **Register a Tenant** (using Postman/curl):
```bash
curl -X POST http://localhost:4000/api/tenants/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Store",
    "shopify_store_url": "test-store.myshopify.com",
    "api_key": "your_shopify_api_key",
    "api_secret": "your_shopify_api_secret"
  }'
```

2. **Copy the returned tenant ID**

3. **Login to Dashboard:**
   - Go to http://localhost:3000
   - Enter the tenant ID
   - View your analytics!

## 🛠️ Common Issues

**Port already in use:**
```bash
# Find and kill process
lsof -i :4000
kill -9 <PID>
```

**Database connection failed:**
```bash
# Check PostgreSQL is running
pg_isready
# Or restart Docker
docker-compose restart postgres
```

**Prisma Client not found:**
```bash
cd backend
npx prisma generate
```

## 📚 Documentation
- [API Documentation](API_DOCUMENTATION.md)
- [Architecture](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Testing Guide](TESTING.md)
- [Submission Checklist](SUBMISSION_CHECKLIST.md)

## 🎓 Tech Stack
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Frontend:** Next.js, React, Tailwind CSS
- **Database:** PostgreSQL
- **Tools:** Docker, node-cron

## 📦 Project Structure
```
shopify/
├── backend/          # API server
├── frontend/         # Dashboard
├── docker-compose.yml
└── docs/            # Documentation
```

## ✅ Submission Ready
This project includes:
- ✅ Complete source code
- ✅ Docker setup
- ✅ Comprehensive documentation
- ✅ API examples
- ✅ Testing framework
- ✅ Production-ready architecture

See [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for full details.
