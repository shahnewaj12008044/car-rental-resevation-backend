import AppError from "../../Error/AppError";
import { TUser } from "../User/user.interface"
import { User } from "../User/user.model"
import httpStatus from 'http-status-codes';


const signUpIntoDB = async( payload:TUser) =>{
    //is user is exist?
    const user = await User.findOne({id:payload?.email});
    if(user){
        throw new AppError(httpStatus.BAD_REQUEST,"This User is already exist")
    }

    const result = await User.create(payload);
    return result;
}


export const AuthServices = {
    signUpIntoDB,
}