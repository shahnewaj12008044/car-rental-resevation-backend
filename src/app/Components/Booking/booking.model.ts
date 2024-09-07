import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "Car is required"],
      unique: true,
      ref: "User",
    },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);




export const Booking = model<TBooking>("Booking", bookingSchema);
