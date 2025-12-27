import { Router } from 'express';
import * as videoController from '../controllers/video.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/script', videoController.generateScriptHandler);
router.post('/voice', videoController.generateVoiceHandler);
router.post('/video', videoController.createVideoHandler);
router.post('/publish', videoController.publishVideoHandler);
router.get('/status/:id', videoController.getVideoStatus);

export default router;
