import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: Number;
};

export type TCarPayload = {
  carId: string;
  date: string;
  startTime: string;
}
