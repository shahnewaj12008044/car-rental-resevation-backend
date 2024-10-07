import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validationRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { ROLE_OBJ } from './user.constant';

const router = express.Router();

router.get('/', auth(ROLE_OBJ.admin), UserControllers.getAllUser);
//update user by admin
router.put('/:id', auth(ROLE_OBJ.admin),validationRequest(userValidations.userUpdateValidationSchema), UserControllers.getUpdateUser);

router.delete('/:id', auth(ROLE_OBJ.admin), UserControllers.deleteUser);
//update my profile
router.put('/profile/:id', auth(ROLE_OBJ.user), UserControllers.updateProfile);
router.get('/profile/:id', auth(ROLE_OBJ.user), UserControllers.getMyProfile);

export const UserRoutes = router;
