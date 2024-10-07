import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { ROLE_OBJ } from "../User/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router()

router.post('/',auth(ROLE_OBJ.user),validationRequest(BookingValidation.createBookingValidationSchema), BookingController.createBooking)
router.get('/',auth(ROLE_OBJ.admin),BookingController.getAllBooking)
//*update booking by the admin

router.put('/return',auth(ROLE_OBJ.admin),BookingController.returACar)

router.put('/:id',auth(ROLE_OBJ.admin),validationRequest(BookingValidation.updateBookingValidationSchema),BookingController.updateBooking)

router.get('/my-bookings',auth(ROLE_OBJ.user),BookingController.getUsersBooking)

router.put('/my-booking/:id',auth(ROLE_OBJ.user),validationRequest(BookingValidation.updateMyBookingValidationSchema),BookingController.updateMyBooking)



router.get('/dashboard', BookingController.adminCountDashboard);

export const BookingRoutes = router;