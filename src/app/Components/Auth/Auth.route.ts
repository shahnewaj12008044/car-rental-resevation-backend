import { Router } from "express";
import { AuthoController } from "./Auth.controller";
import validationRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./Auth.validation";
import { userValidations } from "../User/user.validation";

const router = Router();

router.post('/signup', validationRequest(userValidations.userRegistrationValidationSchema) ,AuthoController.signUp)

router.post('/signin',validationRequest(AuthValidations.singInValidationSchema),AuthoController.signIn)


export const AuthRoutes = router;