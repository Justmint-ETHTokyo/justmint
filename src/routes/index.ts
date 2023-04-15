import { Router } from 'express';
import authRouter from './authRouter';
import smsRouter from './smsRouter';
import nftRouter from './nftRouter';
import adminRouter from './adminRouter';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/sms', smsRouter);
router.use('/nft', nftRouter);
router.use('/admin', adminRouter);

export default router;
