import auth from '../middlewares/authenticationMiddleware';
import { Router } from 'express';
import { 
    getTransactionController,
    postTransactionController,
    putTransactionController,
    deleteTransactionController
  } from '../controllers/transactionControllers';

const router = Router();
router.use(auth)
router.get('/transactions', getTransactionController);
router.post('/transactions', postTransactionController);
router.put('/transactions', putTransactionController);
router.delete('/transactions', deleteTransactionController);

export default router;