import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";

const carShema = new Schema<TCar>(
  {
    name: { type: String, required: [true, "Name is required!"] },
    description: { type: String },
    color: { type: String },
    isElectric: { type: Boolean },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: { type: [String] },
    pricePerHour: { type: Number },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Car = model<TCar>("Car", carShema);
