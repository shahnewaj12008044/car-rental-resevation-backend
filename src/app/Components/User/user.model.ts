import { model, Schema } from "mongoose";
import { TUser} from "./user.interface";
import { Role } from "./user.constant";

//username schema


export const userSchema = new Schema<TUser>({
  name: { type: String, required: [true, "UserName is Required"] },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: true,
  },
  role: {
    type: String,
    enum: Role,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: 0, //it will prevent to show password in any type of query
  },
  phone: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
});


export const User = model<TUser>('User', userSchema)
