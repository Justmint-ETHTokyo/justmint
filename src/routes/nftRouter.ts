import { Router } from 'express';
import auth from '../middlewares/auth';
import { nftController } from '../controllers';
import { body, param, query } from 'express-validator';
import errorValidator from '../middlewares/error/errorValidator';
import upload from '../middlewares/upload';

const router: Router = Router();

router.get(
  '/',
  [query('type').notEmpty().isIn(['create', 'owm', 'reward'])],
  auth,
  nftController.getInfoByType,
);

router.post(
  '/',
  upload.single('image'),
  [
    body('nftName').notEmpty(),
    body('description').notEmpty(),
    body('authType').notEmpty(),
    body('options').notEmpty(),
    body('chainType').notEmpty().isIn(['Ethereum', 'Polygon']),
  ],
  errorValidator,
  auth,
  nftController.createNft,
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
