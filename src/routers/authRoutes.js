import {Router} from 'express';

import { postParticipantController, getParticipantsController } from '../controllers/participantsControllers.js';
import {signUpMiddleware} from '../middlewares/userMiddlewares.js';

const router = Router();

router.post('/participants', signUpMiddleware, postParticipantController);
router.get('/participants', getParticipantsController);


export default router;