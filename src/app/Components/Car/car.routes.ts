import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarController } from "./car.controller";

const router = Router()

router.post('/',validationRequest(CarValidations.createCarValidationSchema), CarController.createCar)



export const CarRoutes = router;