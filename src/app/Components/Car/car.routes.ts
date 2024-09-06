import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarController } from "./car.controller";
import auth from "../../middlewares/auth";
import { ROLE_OBJ } from "../User/user.constant";

const router = Router()

router.post('/',auth(ROLE_OBJ.admin),validationRequest(CarValidations.createCarValidationSchema), CarController.createCar)



export const CarRoutes = router;