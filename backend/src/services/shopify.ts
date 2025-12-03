import axios from 'axios';

interface ShopifyConfig {
    shopUrl: string;
    accessToken: string;
}

export const createShopifyClient = (config: ShopifyConfig) => {
    const baseURL = `https://${config.shopUrl}/admin/api/2023-07`;

    const client = axios.create({
        baseURL,
        headers: {
            'X-Shopify-Access-Token': config.accessToken,
            'Content-Type': 'application/json',
        },
    });

    return {
        getProducts: async () => {
            const response = await client.get('/products.json');
            return response.data.products;
        },
        getCustomers: async () => {
            const response = await client.get('/customers.json');
            return response.data.customers;
        },
        getOrders: async () => {
            const response = await client.get('/orders.json?status=any');
            return response.data.orders;
        },
    };
};
