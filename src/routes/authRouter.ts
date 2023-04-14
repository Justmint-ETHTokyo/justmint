import { Router } from 'express';
import { userController } from '../controllers';
import errorValidator from '../middlewares/error/errorValidator';

const router: Router = Router();

router.post('/kakao', userController.getSocialUser);

export default router;
