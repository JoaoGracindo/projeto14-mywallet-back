import express from 'express';

import { postParticipantController, getParticipantsController } from '../controllers/participantsControllers.js';
import {signUpMiddleware} from '../middlewares/userMiddlewares.js';

const router = express.Router();

router.post('/participants', signUpMiddleware, postParticipantController);
router.get('/participants', getParticipantsController);


export default router;