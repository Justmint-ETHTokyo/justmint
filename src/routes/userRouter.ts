import { Router } from 'express';
import auth from '../middlewares/auth';
import { userController } from '../controllers';
import { body } from 'express-validator';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.get('/profile', auth, userController.getUserInfo);

router.get('/quest', auth, userController.getQuestInfo);
router.patch('/quest', auth, userController.updateQuestInfo);
router.patch(
  '/secret',
  [body('secret').isString().notEmpty()],
  errorValidator,
  auth,
  userController.updateSecret,
);
export default router;
