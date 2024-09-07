import httpStatus from "http-status-codes";
import AppError from "../../Error/AppError";
import { Car } from "../Car/car.model";
import { TBooking, TCarPayload } from "./booking.interface";

import { JwtPayload } from "jsonwebtoken";
import { Booking } from "./booking.model";
import { startSession } from "mongoose";


 const createBookingIntoDB = async(userData:JwtPayload,payload:TCarPayload) =>{
  //  console.log(userData,payload)
   const bookingData:Partial<TBooking> = {}
   //checking if the carId is valid or not
   const car = await Car.findById(payload?.carId)
  //  console.log(car)
  
   if(!car || car?.isDeleted || car?.status === "unavailable"){
    throw new AppError(httpStatus.NOT_FOUND,"The car is not available right now")
   }
   bookingData.car = car?._id;
   bookingData.user = userData?.userId;
   bookingData.date = payload?.date;
   bookingData.startTime = payload?.startTime;
   const session = await startSession();
   try{
     session.startTransaction()
    const createBooking = await Booking.create([bookingData],{session})
    if(!createBooking){
      throw new AppError(httpStatus.FORBIDDEN,"Failed to create Booking!")
    }
    // console.log(createBooking)
    //changing the status of car
    const carStatus = await Car.findByIdAndUpdate({_id:car?._id},{status:"unavailable"},{session,new:true})
    // console.log(carStatus)
    if(!carStatus){
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to create Booking")
    }
    console.log(createBooking[0].id)
    

    await session.commitTransaction();
    await session.endSession();
    const result = await Booking.findById(createBooking[0].id).populate('user').populate('car')
    console.log(result)
    
    return result;

   } catch(err){
    // console.log(err)
    
      await session.abortTransaction()
      await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,err as string)
    
   }

 }

export const BookingService = {
    createBookingIntoDB,
 }