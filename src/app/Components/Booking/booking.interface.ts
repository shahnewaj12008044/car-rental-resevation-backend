import { Types } from "mongoose";

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  isBooked: 'pending' | 'approved' | 'cancelled';
  payment: 'pending' | 'paid' | null;
  gps: boolean;
  childSeat: boolean;
  drivingLicense: string;
  nidOrPassport: string;
  phone: string;
  premiumInsurance: boolean;
  fullInsurance: boolean;
  basicInsurance: boolean;
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
