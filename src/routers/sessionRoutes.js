import { Router } from "express"; 

import {getSessionsController, logInController, logout} from '../controllers/sessionControllers.js';
import authentication from "../middlewares/authenticationMiddleware.js";

const router = Router();


router.get('/', getSessionsController);
router.post('/', logInController);
router.delete('/', authentication, logout);


export default router;