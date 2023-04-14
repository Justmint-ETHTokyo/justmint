import { Router } from 'express';
import authRouter from './authRouter';
import smsRouter from './smsRouter';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/sms', smsRouter);

export default router;
