import { Router } from 'express';
import { tokenController, userController } from '../controllers';
import errorValidator from '../middlewares/error/errorValidator';
import { body } from 'express-validator';

const router: Router = Router();

router.post('/kakao', userController.getSocialUser);
router.post(
  '/signup',
  [
    body('snsId').notEmpty(),
    body('nickname').notEmpty(),
    body('profileImage').notEmpty(),
    body('email').notEmpty(),
    body('phone').notEmpty(),
    body('social').notEmpty(),
    body('isMarketing').notEmpty(),
    body('secret').notEmpty(),
    body('walletAddress').notEmpty(),
  ],
  errorValidator,
  userController.createUser,
);
router.get('/token', tokenController.getToken);

export default router;
