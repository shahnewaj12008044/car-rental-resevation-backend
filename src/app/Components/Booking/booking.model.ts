import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },

    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    isBooked: {
      type: String,
      enum: ['pending', 'approved', 'cancelled'],
      default: 'pending',
      required: true,
    },
    payment: {
      type: String,
      enum: ['pending', 'paid'],
      default:"pending",
    },
    gps: {
      type: Boolean,
      default: false,
    },
    childSeat: {
      type: Boolean,
      default: false,
    },
    drivingLicense: {
      type: String,
    },
    nidOrPassport: {
      type: String,
    },
    phone: {
      type: String,
    },
    basicInsurance: {
      type: Boolean,
      default: false,
    },
    premiumInsurance: {
      type: Boolean,
      default: false,
    },
    fullInsurance: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);



export const Booking = model<TBooking>("Booking", bookingSchema);
