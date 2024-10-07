import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status-codes";
import { BookingService } from "./booking.service";
// import NoDataFound from "../../utils/noDataFound";

const createBooking = catchAsync(async (req, res) => {
  // console.log(req.user)
  const result = await BookingService.createBookingIntoDB(req.user, req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "Car is booked successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateBookingIntoDB(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully",
    data: result,
  });
});
const updateMyBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateMyBookingFromDB(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  // console.log(req.user)
  // console.log(req.query);
  const result = await BookingService.getAllBookingsFromDB(req.query);
  // if(!result || result.length === 0){
  //     NoDataFound(res)
  // }
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getUsersBooking = catchAsync(async (req, res) => {
  const { userId } = req.user;
  // console.log(req.user)
  // console.log(userId)

  const result = await BookingService.getUsersBookingFromDB(userId);
  // if(!result || result.length === 0){
  //     NoDataFound(res)
  // }
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

const returACar = catchAsync(async (req, res) => {
  const result = await BookingService.returnACarIntoDB(req.body);
  // console.log(result)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});

const adminCountDashboard = catchAsync(async (req, res) => {
  const result = await BookingService.adminCountDashboardFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "total dashboard count successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getUsersBooking,
  returACar,
  updateBooking,
  updateMyBooking,
  adminCountDashboard,
};
