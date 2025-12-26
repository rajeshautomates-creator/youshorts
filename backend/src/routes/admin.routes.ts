import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
// import { adminMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/metrics', adminController.getMetrics);
router.get('/jobs', adminController.getJobs);
router.get('/videos', adminController.getVideos);
router.post('/settings', adminController.updateSettings);

export default router;
