import { Router } from 'express';
import { getDashboardStats, getSalesChartData } from '../controllers/analyticsController';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/sales', getSalesChartData);

export default router;
