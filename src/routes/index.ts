import { Router } from 'express';
import authRouter from './authRouter';
import smsRouter from './smsRouter';
import nftRouter from './nftRouter';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/sms', smsRouter);
router.use('/nft', nftRouter);

export default router;
