import { model, Schema } from "mongoose";
import { CarModel, TCar } from "./car.interface";
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

//conflicted with the car booking these will be done by statics

// carShema.pre('find', async function(next){
//   this.find({status:{$ne:"unavailable"}})
//   next()
// })

// carShema.pre('findOne', async function(next){
//   this.find({status:{$ne:"unavailable"}})
//   next()
// })

carShema.statics.isCarDeletedOrAvailable = async function(id:string){
  const car = await this.findById(id);
  if(!car){
    return false
  }
  return car.status === "unavailable" || car.isDeleted;
}






export const Car = model<TCar, CarModel>("Car", carShema);
