/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../Error/AppError";
import { Car } from "../Car/car.model";
import { TBooking,  TReturnPayload } from "./booking.interface";

import { JwtPayload } from "jsonwebtoken";
import { Booking } from "./booking.model";
import { startSession } from "mongoose";
import { convertTo24HrsFormat } from "../../utils/timeFormater";

const createBookingIntoDB = async (
  userData: JwtPayload,
  payload: TBooking,
) => {
  let bookingData: Partial<TBooking> = {};
  //checking if the carId is valid or not
  //checking if the car is available or not
  const car = await Car.findById(payload?.car)
  if(car?.status === 'unavailable'){
    throw new AppError(httpStatus.BAD_REQUEST,"this car is not available right now!")
  } 
  bookingData = {...payload,user:userData?.userId}
  
  const result = await Booking.create(bookingData)

  return result;
 
};

//can updated by the admin
const updateBookingIntoDB = async ( id : string, payload:Partial<TBooking>) => {
  const bookingData = await Booking.findById(id);
  if(!bookingData){
    throw new AppError(httpStatus.NOT_FOUND,"This booking data is not found!")
  }
  const session = await startSession();
  try{
   session.startTransaction()
    const updatedBooking = await Booking.findByIdAndUpdate(id,payload,{new:true,session})
    if(!updatedBooking){
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to update the booking")
    }
   if(updatedBooking.isBooked==="approved"){
    const carStatus = await Car.findOneAndUpdate({_id:updatedBooking.car},{status:'unavailable'},{new:true,session})
    if(!carStatus){
      throw new AppError(httpStatus.BAD_REQUEST,"failed to update car")
    }
   }
    await session.commitTransaction()
    await session.endSession()
    return updatedBooking;
  }catch(err : any){
    await session.abortTransaction();
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST,err)
  }

}

//this is for the admin
const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  // console.log(query)
  let queryTerm = {};
  const { carId, date } = query;
  if (carId && date) {
    queryTerm = { $and: [{ car: carId }, { date: date }] };
  }
  // console.log(queryTerm)

  const result = await Booking.find(queryTerm).populate("car").populate("user");
  return result;
};

//this is for the user
const getUsersBookingFromDB = async (id: string) => {
  const result = await Booking.find({ user: id })
    .populate("car")
    .populate("user");
  return result;
};

//this is for the user
const updateMyBookingFromDB = async(id:string,payload:Partial<TBooking>) =>{
  const bookingData = await Booking.findById(id);
  if(bookingData?.isBooked === 'approved' || bookingData?.isBooked ==='cancelled'){
    throw new AppError(httpStatus.FORBIDDEN,"this booking is approved and now it can not be updated!");
  }
  if(payload?.isBooked ==='approved' || payload?.payment){
    throw new AppError (httpStatus.FORBIDDEN,"You are not allowed to update this fields!!!")
  }
  const result = await Booking.findByIdAndUpdate(id,payload,{new:true})
  return result;
}

//this is for the admin
const returnACarIntoDB = async (payload: TReturnPayload) => {
  const booking = await Booking.findById(payload?.bookingId);

  const car = await Car.findById(booking?.car);
  // console.log(car)
  const pricePerHour = car?.pricePerHour as number;
  // console.log(pricePerHour)
 const starTimeModified = convertTo24HrsFormat(booking?.startTime);
//  console.log(time)
const endTimeModified = convertTo24HrsFormat(payload?.endTime)
  
  // console.log(car)
  const session = await startSession();
  try {
    session.startTransaction();
    
    const startTime = new Date(
      `1970-01-01T${starTimeModified}:00Z`
    ).getTime();
    const endTime = new Date(`1970-01-01T${endTimeModified}:00Z`).getTime();
    const time = (endTime - startTime) / (1000 * 60 * 60);

    if (time <= 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "end time can't be less or same than start time"
      );
    }
    // console.log(booking)
    const totalCost = time * pricePerHour;

    const bookingCost = await Booking.findByIdAndUpdate(
      booking?.id,
      { totalCost: totalCost, endTime: payload?.endTime },
      { new: true, session }
    );

    if (!bookingCost) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to return car!");
    }

    //changing the status of car
    const carStatus = await Car.findByIdAndUpdate(
      booking?.car,
      { status: "available" },
      { new: true, session }
    );
    if (!carStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to return car!!");
    }
    await session.commitTransaction();
    await session.endSession();

    const bookingReturned = await Booking.findById(payload?.bookingId)
      .populate("user")
      .populate("car");

    return bookingReturned;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "failed to return car!!!");
  }
};

const getTotalBookingsFromDB = async () => {
  const totalBookings = await Booking.countDocuments();
  return totalBookings;
};

const getTotalAvailableCarsFromDB = async () => {
  const totalAvailableCars = await Car.countDocuments({ status: 'available' });
  return totalAvailableCars;
};

const getTotalRevenueFromDB = async () => {
  const totalRevenue = await Booking.aggregate([
    { $match: { payment: 'paid' } }, // Assuming you have a paymentStatus field
    { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } },
  ]);
  return totalRevenue[0]?.totalRevenue || 0;
};

const adminCountDashboardFromDB = async () => {
  const totalBookings = await getTotalBookingsFromDB();
  const totalAvailableCars = await getTotalAvailableCarsFromDB();
  const totalRevenue = await getTotalRevenueFromDB();

  return [{name:"totalBookings",value: totalBookings},
  {name:"totalAvailableCars",value:totalAvailableCars},
  {name:"totalRevenue",value:totalRevenue}]
  
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUsersBookingFromDB,
  returnACarIntoDB,
  updateBookingIntoDB,
  updateMyBookingFromDB,
  adminCountDashboardFromDB,
};
