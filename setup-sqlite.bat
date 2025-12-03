@echo off
echo Setting up SQLite database...

cd backend

echo Updating environment...
echo PORT=4000 > .env
echo DATABASE_URL="file:./dev.db" >> .env

echo Generating Prisma Client...
call npx prisma generate

echo Creating SQLite database...
call npx prisma db push

echo Starting backend server...
call npm run dev
