import { create } from "domain";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../User/user.model";

 const createBookingIntoDB = async(userData:JwtPayload,payload:TBooking) =>{
    // console.log(req.user)\
    const userEmail = userData.jwtPayload.email;
    // console.log(userEmail)
    const user = await User.findOne({email:userEmail})

    // console.log(user)
   
    
    const result = await Booking.create(payload)
    console.log(result)
    return result;

 }

export const BookingService = {
    createBookingIntoDB,
 }