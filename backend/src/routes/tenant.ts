import { Router } from 'express';
import { registerTenant, getTenants } from '../controllers/tenantController';

const router = Router();

router.post('/register', registerTenant);
router.get('/', getTenants);

export default router;
