import { Router } from "express";
import { AuthRoutes } from "../Components/Auth/Auth.route";
import { CarRoutes } from "../Components/Car/car.routes";
import { BookingRoutes } from "../Components/Booking/booking.route";


const router = Router();

const moduleRouter = [
    {
        path:'/auth',
        route: AuthRoutes
    },
    {
        path:'/cars',
        route:CarRoutes
    },
    {
        path:'/bookings',
        route:BookingRoutes
    }
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;
