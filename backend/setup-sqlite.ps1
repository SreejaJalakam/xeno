# SQLite Setup Script for Shopify Backend
Write-Host "Setting up SQLite database..." -ForegroundColor Green

# Update .env file
$envContent = @"
PORT=4000
DATABASE_URL="file:./dev.db"
"@

Set-Content -Path ".env" -Value $envContent
Write-Host "✓ Updated .env file" -ForegroundColor Green

# Generate Prisma Client
Write-Host "`nGenerating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma Client generated" -ForegroundColor Green
    
    # Push database schema
    Write-Host "`nCreating SQLite database..." -ForegroundColor Yellow
    npx prisma db push --accept-data-loss
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created successfully" -ForegroundColor Green
        Write-Host "`n🚀 Setup complete! Starting server..." -ForegroundColor Cyan
        npm run dev
    } else {
        Write-Host "✗ Database creation failed" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Prisma Client generation failed" -ForegroundColor Red
}
