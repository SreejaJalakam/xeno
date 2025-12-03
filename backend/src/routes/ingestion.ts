import { Router } from 'express';
import { triggerIngestion } from '../controllers/ingestionController';

const router = Router();

router.post('/trigger', triggerIngestion);

export default router;
