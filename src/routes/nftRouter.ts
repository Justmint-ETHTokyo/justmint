import { Router } from 'express';
import auth from '../middlewares/auth';
import { nftController } from '../controllers';
import { param, query } from 'express-validator';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.get(
  '/',
  [query('type').notEmpty().isIn(['create', 'owm', 'reward'])],
  auth,
  nftController.getInfoByType,
);

router.get(
  '/:nftId/detail',
  [param('nftId').notEmpty()],
  errorValidator,
  nftController.getNftDetailInfo,
);

router.get(
  '/:nftId/owners',
  [param('nftId').notEmpty()],
  errorValidator,
  nftController.getNftOwnersInfo,
);

export default router;
