import { Router } from 'express';

import auth from '../middlewares/authenticationMiddleware.js';
import { 
    getTransactionController,
    postTransactionController,
    putTransactionController,
    deleteTransactionController
  } from '../controllers/transactionControllers.js';

const router = Router();
router.use(auth)
router.get('/transactions', getTransactionController);
router.post('/transactions', postTransactionController);
router.put('/transactions/:id', putTransactionController);
router.delete('/transactions/:id', deleteTransactionController);

export default router;