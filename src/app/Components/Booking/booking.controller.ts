
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"

import httpStatus from "http-status-codes";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async(req, res) =>{
   
    console.log(req.user)
    const result = await BookingService.createBookingIntoDB(req.user,req.body)
    
    sendResponse(res, {
        status: httpStatus.CREATED,
        success: true,
        message: 'Car is booked successfully',
        data: result,
      });
})


export const BookingController = {
    createBooking,
}