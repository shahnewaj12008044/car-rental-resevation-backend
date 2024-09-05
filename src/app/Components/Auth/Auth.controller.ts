import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import httpStatus from 'http-status-codes';


const signUp = catchAsync(async(req,res)=>{
    const result = await AuthServices.signUpIntoDB(req.body);

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: 'admin is created successfully',
        data: result,
      });
})

export const AuthoController = {
    signUp
}