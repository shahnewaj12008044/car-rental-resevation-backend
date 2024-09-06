import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { CarServices } from "./car.service"
import httpStatus from "http-status-codes";

const createCar = catchAsync(async(req, res) =>{
    const result = await CarServices.createCarIntoDB(req.body)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Car is created successfully',
        data: result,
      });
})

export const CarController = {
    createCar,
}