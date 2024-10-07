import { Router } from "express";
import { AuthRoutes } from "../Components/Auth/Auth.route";
import { CarRoutes } from "../Components/Car/car.routes";
import { BookingRoutes } from "../Components/Booking/booking.route";
import { UserRoutes } from "../Components/User/user.routes";
import { PaymentRoutes } from "../Components/payment/payment.route";


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
    },
    {
        path: '/users',
        route: UserRoutes,
      },
      {
        path: '/payment',
        route: PaymentRoutes,
      },
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;
