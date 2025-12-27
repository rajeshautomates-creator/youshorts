import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Apply authentication and SUPER_ADMIN authorization to all admin routes
router.use(authenticate);
router.use(authorize(['SUPER_ADMIN']));

router.get('/metrics', adminController.getMetrics);
router.get('/jobs', adminController.getJobs);
router.get('/videos', adminController.getVideos);
router.post('/settings', adminController.updateSettings);

export default router;
