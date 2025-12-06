import { Request, Response } from 'express';
import { ingestDataForTenant } from '../services/ingestion';
import prisma from '../utils/prisma';

export const triggerIngestion = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.body;

        if (!tenantId) {
            return res.status(400).json({ error: 'Missing tenantId' });
        }

        // Trigger ingestion in background (or await if preferred for simple test)
        // For now, we await to see errors
        await ingestDataForTenant(tenantId);

        res.json({ message: 'Ingestion completed successfully' });
    } catch (error: any) {
        console.error('Error during ingestion:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const triggerAllIngestion = async (req: Request, res: Response) => {
    try {
        console.log('Running manual/cron data ingestion for ALL tenants...');
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

        res.json({ message: 'Global ingestion completed', results });
    } catch (error: any) {
        console.error('Error during global ingestion:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
