import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, shopify_store_url, api_key, api_secret } = body;

        if (!name || !shopify_store_url || !api_key) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const tenant = await prisma.tenant.create({
            data: {
                name,
                shopify_store_url,
                api_key,
                api_secret,
            },
        });

        return NextResponse.json({ id: tenant.id, message: 'Tenant registered successfully' }, { status: 201 });
    } catch (error: any) {
        console.error('Error registering tenant:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
