import { Router } from "express";
import { AuthRoutes } from "../Components/Auth/Auth.route";


const router = Router();

const moduleRouter = [
    {
        path:'/auth',
        route: AuthRoutes
    }
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;
