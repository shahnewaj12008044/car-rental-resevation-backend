import catchAsync from "../../utils/catchAsync"
import NoDataFound from "../../utils/noDataFound";
import sendResponse from "../../utils/sendResponse"
import { CarServices } from "./car.service"
import httpStatus from "http-status-codes";

const createCar = catchAsync(async(req, res) =>{
    const result = await CarServices.createCarIntoDB(req.body)
    
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Car is created successfully',
        data: result,
      });
})


const getAllCars = catchAsync(async(req, res) =>{

    const result = await CarServices.getAllCarsFromDB(req.query)
    if(!result || result.length === 0){
        NoDataFound(res)
    }
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Cars are retrieved  successfully',
        data: result,
      });
})

const getSingleCar = catchAsync(async(req, res) =>{
    const {id} = req.params;
    const result = await CarServices.getSingleCarFromDB(id)
    if(!result){
        NoDataFound(res)
    }
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Car is retrieved  successfully',
        data: result,
      });
})


const updateCar = catchAsync(async(req, res) =>{
    const {id} = req.params;
    const result = await CarServices.updateCarIntoDB(id,req.body)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Car is updated  successfully!!',
        data: result,
      });
})

const deleteCar = catchAsync(async(req, res) =>{
    const {id} = req.params;
    const result = await CarServices.deleteCarFromDB(id)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'Car is deleted  successfully!!',
        data: result,
      });
})





export const CarController = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
}