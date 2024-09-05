import { Router } from "express";
import { AuthoController } from "./Auth.controller";

const router = Router();

router.post('/signup',AuthoController.signUp)
router.post('/signin',AuthoController.signIn)


export const AuthRoutes = router;