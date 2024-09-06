import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.service";
import httpStatus from "http-status-codes";

const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: `${result?.role} is created successfully`,
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const result = await AuthServices.signInIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: ` is created successfully`,
    data: result?.user,
    token: result?.token,
  });
});

export const AuthoController = {
  signUp,
  signIn,
};
