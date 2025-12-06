import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tenantId = searchParams.get('tenantId');

        if (!tenantId) {
            return NextResponse.json({ error: 'Missing tenantId' }, { status: 400 });
        }

        const id = String(tenantId);

        const [orderCount, customerCount, productCount, totalRevenue, topCustomers] = await Promise.all([
            prisma.order.count({ where: { tenant_id: id } }),
            prisma.customer.count({ where: { tenant_id: id } }),
            prisma.product.count({ where: { tenant_id: id } }),
            prisma.order.aggregate({
                where: { tenant_id: id },
                _sum: { total_price: true },
            }),
            prisma.order.groupBy({
                by: ['customer_id'],
                where: { tenant_id: id, customer_id: { not: null } },
                _sum: { total_price: true },
                orderBy: { _sum: { total_price: 'desc' } },
                take: 5,
            }),
        ]);

        // Enrich top customers with names
        const enrichedTopCustomers = await Promise.all(
            topCustomers.map(async (item: any) => {
                const customer = await prisma.customer.findUnique({
                    where: { id: item.customer_id! },
                });
                return {
                    name: customer ? `${customer.first_name} ${customer.last_name}` : 'Unknown',
                    email: customer?.email || '',
                    totalSpent: item._sum.total_price || 0,
                };
            })
        );

        const revenue = totalRevenue._sum.total_price || 0;
        const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

        return NextResponse.json({
            totalOrders: orderCount,
            totalCustomers: customerCount,
            totalProducts: productCount,
            totalRevenue: revenue,
            avgOrderValue: avgOrderValue,
            topCustomers: enrichedTopCustomers,
        });

    } catch (error: any) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
    }
}
