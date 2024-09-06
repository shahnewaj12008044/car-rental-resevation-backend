import { Router } from "express";
import { AuthRoutes } from "../Components/Auth/Auth.route";
import { CarRoutes } from "../Components/Car/car.routes";


const router = Router();

const moduleRouter = [
    {
        path:'/auth',
        route: AuthRoutes
    },{
        path:'/cars',
        route:CarRoutes
    }
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;
