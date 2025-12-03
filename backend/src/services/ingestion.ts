import prisma from '../utils/prisma';
import { createShopifyClient } from './shopify';

export const ingestDataForTenant = async (tenantId: string) => {
    const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
    });

    if (!tenant) {
        throw new Error(`Tenant with ID ${tenantId} not found`);
    }

    const shopify = createShopifyClient({
        shopUrl: tenant.shopify_store_url,
        accessToken: tenant.api_key,
    });

    // 1. Ingest Customers
    console.log(`Fetching customers for tenant ${tenant.name}...`);
    const customers = await shopify.getCustomers();
    for (const customer of customers) {
        await prisma.customer.upsert({
            where: {
                tenant_id_shopify_customer_id: {
                    tenant_id: tenant.id,
                    shopify_customer_id: String(customer.id),
                },
            },
            update: {
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
            },
            create: {
                tenant_id: tenant.id,
                shopify_customer_id: String(customer.id),
                first_name: customer.first_name,
                last_name: customer.last_name,
                email: customer.email,
            },
        });
    }

    // 2. Ingest Products
    console.log(`Fetching products for tenant ${tenant.name}...`);
    const products = await shopify.getProducts();
    for (const product of products) {
        await prisma.product.upsert({
            where: {
                tenant_id_shopify_product_id: {
                    tenant_id: tenant.id,
                    shopify_product_id: String(product.id),
                },
            },
            update: {
                title: product.title,
                price: parseFloat(product.variants[0]?.price || '0'),
                inventory: product.variants[0]?.inventory_quantity || 0,
            },
            create: {
                tenant_id: tenant.id,
                shopify_product_id: String(product.id),
                title: product.title,
                price: parseFloat(product.variants[0]?.price || '0'),
                inventory: product.variants[0]?.inventory_quantity || 0,
            },
        });
    }

    // 3. Ingest Orders
    console.log(`Fetching orders for tenant ${tenant.name}...`);
    const orders = await shopify.getOrders();
    for (const order of orders) {
        let customerId = null;
        if (order.customer) {
            const dbCustomer = await prisma.customer.findUnique({
                where: {
                    tenant_id_shopify_customer_id: {
                        tenant_id: tenant.id,
                        shopify_customer_id: String(order.customer.id),
                    },
                },
            });
            customerId = dbCustomer?.id;
        }

        await prisma.order.upsert({
            where: {
                tenant_id_shopify_order_id: {
                    tenant_id: tenant.id,
                    shopify_order_id: String(order.id),
                },
            },
            update: {
                total_price: parseFloat(order.total_price),
                customer_id: customerId,
            },
            create: {
                tenant_id: tenant.id,
                shopify_order_id: String(order.id),
                total_price: parseFloat(order.total_price),
                customer_id: customerId,
            },
        });
    }

    console.log(`Ingestion completed for tenant ${tenant.name}`);
};
