import AppError from "../../Error/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import httpStatus from 'http-status-codes';


const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async() =>{
  const result = await Car.find();
  return result;
}

const getSingleCarFromDB = async(id:string) =>{
  //checking the car is deleted or unavailable
  const isCarDeletedOrAvailble = await Car.isCarDeletedOrAvailable(id);
 
  if(isCarDeletedOrAvailble){
    throw new AppError(httpStatus.FORBIDDEN,"this car is not available right now")
  }

  const result  = await Car.findById(id);
  //if the car is not found or deleted
  //didnt do it in middleware
 
  return result;
}

const updateCarIntoDB = async(id:string,payload:Partial<TCar>)=>{
  //checking the car is deleted or unavailable
  const isCarDeletedOrAvailble = await Car.isCarDeletedOrAvailable(id);
 
  if(isCarDeletedOrAvailble){
    throw new AppError(httpStatus.FORBIDDEN,"this car is not available right now")
  }

  const result = await Car.findByIdAndUpdate(id,payload,{new:true});
  return result;
}

const deleteCarFromDB = async(id:string) =>{
  const isCarDeletedOrAvailble = await Car.isCarDeletedOrAvailable(id);
 
  if(isCarDeletedOrAvailble){
    throw new AppError(httpStatus.FORBIDDEN,"this car is already deleted or unavailable right now!!")
  }

  const result = await Car.findByIdAndUpdate(id,{isDeleted:true},{new:true})
  return result;
}

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
