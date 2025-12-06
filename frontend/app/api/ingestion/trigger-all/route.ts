import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ingestDataForTenant } from '@/lib/ingestion';

// Allow GET for Vercel Cron
export async function GET(req: Request) {
    try {
        console.log('Running global ingestion trigger...');
        const tenants = await prisma.tenant.findMany();
        const results = [];

        for (const tenant of tenants) {
            console.log(`Syncing data for tenant: ${tenant.name}`);
            try {
                await ingestDataForTenant(tenant.id);
                results.push({ tenant: tenant.name, status: 'success' });
            } catch (err: any) {
                console.error(`Failed to ingest for ${tenant.name}:`, err);
                results.push({ tenant: tenant.name, status: 'failed', error: err.message });
            }
        }

        return NextResponse.json({ message: 'Global ingestion completed', results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
