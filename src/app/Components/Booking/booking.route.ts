import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { ROLE_OBJ } from "../User/user.constant";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router()

router.post('/',auth(ROLE_OBJ.user),validationRequest(BookingValidation.createBookingValidationSchema), BookingController.createBooking)
router.get('/',auth(ROLE_OBJ.admin),BookingController.getAllBooking)
router.get('/my-bookings',auth(ROLE_OBJ.user),BookingController.getUsersBooking)

router.put('/return',auth(ROLE_OBJ.admin),validationRequest(BookingValidation.returnBookingValidation),BookingController.returACar)

export const BookingRoutes = router;