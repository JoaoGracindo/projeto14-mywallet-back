import { Router } from "express"; 

import {getSessionsController, logInController} from '../controllers/sessionControllers.js';

const router = Router();


router.get('/', getSessionsController);
router.post('/', logInController);


export default router;