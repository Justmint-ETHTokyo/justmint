import { Router } from 'express';
import { param } from 'express-validator';
import { adminController } from '../controllers';
import { auth } from '../middlewares';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.get(
  '/:nftId',
  [param('nftId').notEmpty()],
  errorValidator,
  auth,
  adminController.getRequestUser,
);

router.get(
  '/:nftId/reward',
  [param('nftId').notEmpty()],
  errorValidator,
  adminController.getAdminNftRewardList,
);

export default router;
