import AppError from "../../Error/AppError";
import { TUser } from "../User/user.interface"
import { User } from "../User/user.model"
import httpStatus from 'http-status-codes';
import { TSingin } from "./Auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";




const signUpIntoDB = async( payload:TUser) =>{
    //is user is exist?
    const user = await User.findOne({email:payload?.email});
    // console.log(user)
    if(user){
        throw new AppError(httpStatus.BAD_REQUEST,"This User is already exist")
    }

    const result = await User.create(payload);
    return result;
}

//sign in 
const signInIntoDB = async (payload: TSingin) =>{
 const user = await User.findOne({email:payload?.email}).select('+password')
//  console.log(user)

 //checking the user is valid or not
 if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"This email is not registered here. Please sign up first!!")
 }
 //cheking  if the password is matched
 const isPasswordMatched = await bcrypt.compare(payload?.password,user?.password)

//  console.log(isPasswordMatched)
if(!isPasswordMatched){
    throw new AppError(httpStatus.FORBIDDEN,"Wrong Password!!!")
}
//clearing the password field
user.password = "";
//generating token jwt web token

const jwtPayload = {
    email:user?.email,
    role:user?.role,
}
const token = jwt.sign({
    jwtPayload
  }, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires as string });

// Add "Bearer " at the beginning of the token
const bearerToken = `Bearer ${token}`;
console.log(bearerToken)

return { user, token: bearerToken };
}


export const AuthServices = {
    signUpIntoDB,
    signInIntoDB,
}