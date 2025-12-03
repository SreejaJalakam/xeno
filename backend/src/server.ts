import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tenantRoutes from './routes/tenant';
import ingestionRoutes from './routes/ingestion';
import analyticsRoutes from './routes/analytics';
import { startScheduler } from './services/scheduler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tenants', tenantRoutes);
app.use('/api/ingestion', ingestionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('Shopify Ingestion Service API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startScheduler();
});
