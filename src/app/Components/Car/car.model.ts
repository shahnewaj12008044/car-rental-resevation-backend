import { model, Schema } from "mongoose";
import { TCar } from "./car.interface";
import AppError from "../../Error/AppError";
import httpStatus from "http-status-codes";


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

//removing deleted cars from find
carShema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})
// //removing deleted car from findOne
// carShema.pre('findOne',function(next){
//   this.find({isDeleted:{$ne:true}})
//   next()
// })

//preventing delete a car which is already deleted:
carShema.pre('findOneAndUpdate',async function(next) {
  const query = this.getQuery();
  // console.log(query)
  const isCar = await this.model.findOne(query);
  // console.log(isCar)
  if(isCar || isCar?.isDeleted){
    throw new AppError(httpStatus.FORBIDDEN, "This car is already deleted or doesn't exist!")
  }
  next()
})


export const Car = model<TCar>("Car", carShema);
