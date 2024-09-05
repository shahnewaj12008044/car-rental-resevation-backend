import { Router } from "express";
import { AuthoController } from "./Auth.controller";

const router = Router();

router.post('/sign-up',AuthoController.signUp)


export const AuthRoutes = router;