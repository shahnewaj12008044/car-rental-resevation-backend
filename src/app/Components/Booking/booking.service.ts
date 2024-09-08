import httpStatus from "http-status-codes";
import AppError from "../../Error/AppError";
import { Car } from "../Car/car.model";
import { TBooking, TCarPayload, TReturnPayload } from "./booking.interface";

import { JwtPayload } from "jsonwebtoken";
import { Booking } from "./booking.model";
import { startSession } from "mongoose";

const createBookingIntoDB = async (
  userData: JwtPayload,
  payload: TCarPayload
) => {
  const bookingData: Partial<TBooking> = {};
  //checking if the carId is valid or not
  const car = await Car.findById(payload?.carId);

  if (!car || car?.isDeleted || car?.status === "unavailable") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The car is not available right now"
    );
  }
  bookingData.car = car?._id;
  bookingData.user = userData?.userId;
  bookingData.date = payload?.date;
  bookingData.startTime = payload?.startTime;
  const session = await startSession();
  try {
    session.startTransaction();
    const createBooking = await Booking.create([bookingData], { session });
    if (!createBooking) {
      throw new AppError(httpStatus.FORBIDDEN, "Failed to create Booking!");
    }
    //changing the status of car
    const carStatus = await Car.findByIdAndUpdate(
      { _id: car?._id },
      { status: "unavailable" },
      { session, new: true }
    );

    if (!carStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Booking");
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Booking.findById(createBooking[0].id)
      .populate("user")
      .populate("car");

    return result;
  } catch (err) {
    // console.log(err)

    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err as string);
  }
};

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

const getUsersBookingFromDB = async (id: string) => {
  const result = await Booking.find({ user: id })
    .populate("car")
    .populate("user");
  return result;
};

const returnACarIntoDB = async (payload: TReturnPayload) => {
  const booking = await Booking.findById(payload?.bookingId);

  const car = await Car.findById(booking?.car);
  const pricePerHour = car?.pricePerHour as number;

  // console.log(car)
  const session = await startSession();
  try {
    session.startTransaction();

    const startTime = new Date(
      `1970-01-01T${booking?.startTime}:00Z`
    ).getTime();

    const endTime = new Date(`1970-01-01T${payload?.endTime}:00Z`).getTime();
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
      throw new AppError(httpStatus.BAD_REQUEST, "failed to return car");
    }

    //changing the status of car
    const carStatus = await Car.findByIdAndUpdate(
      booking?.car,
      { status: "available" },
      { new: true, session }
    );
    if (!carStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to return car");
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
    throw new AppError(httpStatus.BAD_REQUEST, "failed to return car");
  }
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUsersBookingFromDB,
  returnACarIntoDB,
};
