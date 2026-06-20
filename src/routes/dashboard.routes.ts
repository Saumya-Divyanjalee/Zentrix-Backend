import { Router } from 'express';
import { getDashboardStats, getAdminStats } from '../controllers/dashboard.controller';
import { protect, adminOnly } from '../middleware/auth.middleware';

const router = Router();
router.get('/stats', protect, getDashboardStats);
router.get('/admin-stats', protect, adminOnly, getAdminStats);
export default router;