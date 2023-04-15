import { Router } from 'express';
import auth from '../middlewares/auth';
import { nftController } from '../controllers';
import { body, param, query } from 'express-validator';
import errorValidator from '../middlewares/error/errorValidator';
import upload from '../middlewares/upload';

const router: Router = Router();

router.post(
  '/integrated',
  [
    body('nftIdArray').isArray().notEmpty(),
    body('chainType').isString().notEmpty().isIn(['Ethereum', 'Polygon']),
  ],
  errorValidator,
  auth,
  nftController.createIntegratedNft,
);

router.get('/integrated/check', [
  query('chainType').isIn(['Ethereum', 'Polygon']),
  errorValidator,
  auth,
  nftController.getToBeIntegratedNfts,
]);

router.delete(
  '/integrated',
  [query('id').notEmpty()],
  errorValidator,
  auth,
  nftController.deleteIntegratedNft,
);

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
  '/',
  auth,
  [query('type').notEmpty().isIn(['create', 'owm', 'send'])],
  nftController.getNftList,
);

router.post(
  '/email',
  [body('nftId').notEmpty(), body('email').isEmail().notEmpty()],
  errorValidator,
  auth,
  nftController.sendAuthMailForNft,
);

router.post(
  '/verification/photo',
  upload.single('image'),
  [body('nftId').notEmpty()],
  auth,
  nftController.verifyPhotoForNft,
);

router.patch(
  '/integrated',
  [
    body('integratedNftId').isNumeric().notEmpty(),
    body('nftIdArray').isArray().notEmpty(),
  ],
  errorValidator,
  auth,
  nftController.updateIntegratedNft,
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

router.get(
  '/:nftId/photo',
  [param('nftId').notEmpty()],
  errorValidator,
  auth,
  nftController.getRequestAuthPhoto,
);

router.post(
  '/:nftId/reward',
  [
    param('nftId').notEmpty(),
    body('rewardName').notEmpty(),
    body('description').notEmpty(),
  ],
  errorValidator,
  auth,
  nftController.createReward,
);

router.patch(
  '/:nftId/reward',
  [body('rewardId').notEmpty(), body('rewardName'), body('description')],
  errorValidator,
  auth,
  nftController.updateRewardInfo,
);

router.get('/:rewardId/reward/detail', nftController.getNftRewardDetailInfo);

router.delete(
  '/:nftId/:rewardId',
  [param('rewardId').notEmpty()],
  errorValidator,
  auth,
  nftController.deleteNftReward,
);

export default router;
