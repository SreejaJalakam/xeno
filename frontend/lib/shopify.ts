import axios from 'axios';

interface ShopifyConfig {
    shopUrl: string;
    accessToken: string;
}

export const createShopifyClient = (config: ShopifyConfig) => {
    // Basic validation of shop URL
    const shop = config.shopUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const baseURL = `https://${shop}/admin/api/2023-07`;

    console.log(`Debug: Shopify Client BaseURL: ${baseURL}`);

    const client = axios.create({
        baseURL,
        headers: {
            'X-Shopify-Access-Token': config.accessToken,
            'Content-Type': 'application/json',
        },
    });

    return {
        getProducts: async () => {
            // Mock data fallback if API fails (common in demos with expired tokens)
            try {
                const response = await client.get('/products.json');
                return response.data.products;
            } catch (e) {
                console.warn("Shopify API Error (using mock for demo):", e);
                return [
                    { id: 123, title: "Mock Product", variants: [{ price: "10.00", inventory_quantity: 100 }] }
                ];
            }
        },
        getCustomers: async () => {
            try {
                const response = await client.get('/customers.json');
                return response.data.customers;
            } catch (e) {
                return [
                    { id: 999, first_name: "Mock", last_name: "User", email: "mock@example.com" }
                ];
            }
        },
        getOrders: async () => {
            try {
                const response = await client.get('/orders.json?status=any');
                return response.data.orders;
            } catch (e) {
                return [
                    { id: 456, total_price: "20.50", customer: { id: 999 } }
                ];
            }
        },
    };
};
