import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
};

export type TCarPayload = {
  carId: string;
  date: string;
  startTime: string;
}

export type TReturnPayload = {
    bookingId : string;
    endTime : string;
}
