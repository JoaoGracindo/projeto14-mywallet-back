import express from 'express';

import { postParticipantController, getParticipantsController } from '../controllers/participantsControllers.js';

const router = express.Router();

router.post('/participants', postParticipantController);
router.get('/participants', getParticipantsController);


export default router;