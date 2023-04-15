import { Router } from 'express';
import auth from '../middlewares/auth';
import { userController } from '../controllers';

const router: Router = Router();

router.get('/profile', auth, userController.getUserInfo);

router.get('/quest', auth, userController.getQuestInfo);

export default router;
