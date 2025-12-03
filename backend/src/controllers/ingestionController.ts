import { Request, Response } from 'express';
import { ingestDataForTenant } from '../services/ingestion';

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
