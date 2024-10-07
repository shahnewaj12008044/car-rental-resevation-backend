import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { Role, Status } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

//username schema

export const userSchema = new Schema<TUser>(
  {
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
    isDeleted:{
      type:Boolean,
      default:false,
    },
    status:{
      type:String,
      enum:Status,
      default:'active'
    }
  },
  { timestamps: true }
);

//hashing the password using presave middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds))
  next()
});
//clearing the password in response using post save middleware
userSchema.post("save", async function(doc, next ) {
  doc.password = "";
  next()
})



export const User = model<TUser>("User", userSchema);
