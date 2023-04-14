import { Router } from 'express';
import auth from '../middlewares/auth';
import { nftController } from '../controllers';
import { query } from 'express-validator';

const router: Router = Router();

router.get(
  '/',
  [query('type').notEmpty().isIn(['create', 'owm', 'reward'])],
  auth,
  nftController.getInfoByType,
);

export default router;
