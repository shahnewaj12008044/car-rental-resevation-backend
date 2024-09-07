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
  const result  = await Car.findById(id);
  //if the car is not found or deleted
  //didnt do it in middleware
  if(!result || result?.isDeleted ){
    throw new AppError(httpStatus.NOT_FOUND,"The car is not found!")
  }
  return result;
}

const updateCarIntoDB = async(id:string,payload:Partial<TCar>)=>{
  const result = await Car.findByIdAndUpdate(id,payload,{new:true});
  return result;
}

const deleteCarFromDB = async(id:string) =>{
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
