import request from 'supertest';
import express from 'express';
import tenantRoutes from '../routes/tenant';

const app = express();
app.use(express.json());
app.use('/api/tenants', tenantRoutes);

describe('Tenant API', () => {
    describe('POST /api/tenants/register', () => {
        it('should register a new tenant with valid data', async () => {
            const tenantData = {
                name: 'Test Store',
                shopify_store_url: 'test-store.myshopify.com',
                api_key: 'test_api_key',
                api_secret: 'test_api_secret'
            };

            const response = await request(app)
                .post('/api/tenants/register')
                .send(tenantData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(tenantData.name);
        });

        it('should return 400 for missing required fields', async () => {
            const response = await request(app)
                .post('/api/tenants/register')
                .send({ name: 'Test Store' })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/tenants', () => {
        it('should return list of tenants', async () => {
            const response = await request(app)
                .get('/api/tenants')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});
