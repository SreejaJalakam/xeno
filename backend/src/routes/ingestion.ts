import { Router } from 'express';
import { triggerIngestion, triggerAllIngestion } from '../controllers/ingestionController';

const router = Router();

router.post('/trigger', triggerIngestion);
router.get('/trigger-all', triggerAllIngestion); // GET for easy cron/browser access

export default router;
