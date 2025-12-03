import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const registerTenant = async (req: Request, res: Response) => {
    try {
        const { name, shopify_store_url, api_key, api_secret } = req.body;

        if (!name || !shopify_store_url || !api_key || !api_secret) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingTenant = await prisma.tenant.findUnique({
            where: { shopify_store_url },
        });

        if (existingTenant) {
            return res.status(400).json({ error: 'Tenant already exists for this store URL' });
        }

        const tenant = await prisma.tenant.create({
            data: {
                name,
                shopify_store_url,
                api_key,
                api_secret,
            },
        });

        res.status(201).json(tenant);
    } catch (error) {
        console.error('Error registering tenant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTenants = async (req: Request, res: Response) => {
    try {
        const tenants = await prisma.tenant.findMany();
        res.json(tenants);
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
