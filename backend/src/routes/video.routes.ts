import { Router } from 'express';
import * as videoController from '../controllers/video.controller';
// import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/script', videoController.generateScriptHandler);
router.post('/voice', videoController.generateVoiceHandler);
router.post('/create', videoController.createVideoHandler);
router.get('/status/:id', videoController.getVideoStatus);

export default router;
