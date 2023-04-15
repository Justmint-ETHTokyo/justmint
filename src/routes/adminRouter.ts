import { Router } from 'express';
import { param } from 'express-validator';
import { adminController } from '../controllers';
import { auth } from '../middlewares';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.put('/', auth, adminController.approveOrRejectNft);
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

router.get(
  '/:rewardId/reward/detail',
  [param('rewardId').notEmpty()],
  errorValidator,
  adminController.getAdminNftRewardDetail,
);

export default router;
