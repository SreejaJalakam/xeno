import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.query;

        if (!tenantId) {
            return res.status(400).json({ error: 'Missing tenantId' });
        }

        const id = String(tenantId);

        const [orderCount, customerCount, productCount, totalRevenue] = await Promise.all([
            prisma.order.count({ where: { tenant_id: id } }),
            prisma.customer.count({ where: { tenant_id: id } }),
            prisma.product.count({ where: { tenant_id: id } }),
            prisma.order.aggregate({
                where: { tenant_id: id },
                _sum: { total_price: true },
            }),
        ]);

        const revenue = totalRevenue._sum.total_price || 0;
        const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

        res.json({
            totalOrders: orderCount,
            totalCustomers: customerCount,
            totalProducts: productCount,
            totalRevenue: revenue,
            avgOrderValue: avgOrderValue,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSalesChartData = async (req: Request, res: Response) => {
    // For simplicity, returning mock data as real aggregation requires complex SQL/Prisma
    // In a real app, we would group orders by date
    const mockData = [
        { name: 'Jan', sales: 4000 },
        { name: 'Feb', sales: 3000 },
        { name: 'Mar', sales: 2000 },
        { name: 'Apr', sales: 2780 },
        { name: 'May', sales: 1890 },
        { name: 'Jun', sales: 2390 },
    ];
    res.json(mockData);
};
