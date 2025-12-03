import { CronJob } from 'cron';
import prisma from '../utils/prisma';
import { ingestDataForTenant } from './ingestion';

export const startScheduler = () => {
    // Run every hour: '0 * * * *'
    // For demo purposes, running every minute: '*/1 * * * *'
    const job = new CronJob('*/1 * * * *', async () => {
        console.log('Running scheduled data ingestion...');
        try {
            const tenants = await prisma.tenant.findMany();
            for (const tenant of tenants) {
                console.log(`Syncing data for tenant: ${tenant.name}`);
                await ingestDataForTenant(tenant.id);
            }
        } catch (error) {
            console.error('Error in scheduled ingestion:', error);
        }
    });

    job.start();
    console.log('Scheduler started.');
};
