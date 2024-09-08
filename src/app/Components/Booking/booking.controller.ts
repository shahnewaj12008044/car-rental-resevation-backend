
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"

import httpStatus from "http-status-codes";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async(req, res) =>{
   
    // console.log(req.user)
    const result = await BookingService.createBookingIntoDB(req.user,req.body)
    
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Car is booked successfully',
        data: result,
      });
})

const getAllBooking = catchAsync(async(req, res) =>{
    // console.log(req.user)
    // console.log(req.query);
    const result = await BookingService.getAllBookingsFromDB(req.query)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
      });
})

const getUsersBooking = catchAsync(async(req, res) =>{
    const {userId} = req.user;
    // console.log(req.user)
    // console.log(userId)
    
    const result = await BookingService.getUsersBookingFromDB(userId)
    
    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "My Bookings retrieved successfully",
        data: result,
      });
})


export const BookingController = {
    createBooking,
    getAllBooking,
    getUsersBooking,
}