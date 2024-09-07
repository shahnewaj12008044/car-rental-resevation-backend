import { Router } from "express";
import validationRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";
import { CarController } from "./car.controller";
import auth from "../../middlewares/auth";
import { ROLE_OBJ } from "../User/user.constant";

const router = Router()

router.post('/',auth(ROLE_OBJ.admin),validationRequest(CarValidations.createCarValidationSchema), CarController.createCar)

router.get('/',CarController.getAllCars)

router.get('/:id',CarController.getSingleCar)

router.put('/:id',auth(ROLE_OBJ.admin),validationRequest(CarValidations.updateCarValidationSchema),CarController.updateCar)

router.delete('/:id',auth(ROLE_OBJ.admin),CarController.deleteCar);




export const CarRoutes = router;