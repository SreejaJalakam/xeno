const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const sqliteSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.sqlite.prisma');
const postgresSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.postgresql.prisma');

const databaseUrl = process.env.DATABASE_URL || '';

let sourceSchema = sqliteSchemaPath;
let dbType = 'SQLite';

// Check if DATABASE_URL starts with postgres:// or postgresql://
if (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://')) {
    sourceSchema = postgresSchemaPath;
    dbType = 'PostgreSQL';
}

console.log(`[Database Setup] Detected environment for: ${dbType}`);
console.log(`[Database Setup] Copying ${path.basename(sourceSchema)} to schema.prisma...`);

try {
    fs.copyFileSync(sourceSchema, schemaPath);
    console.log('[Database Setup] Schema updated successfully.');
} catch (error) {
    console.error('[Database Setup] Error copying schema file:', error);
    process.exit(1);
}
