import sendResponse from "./sendResponse";
import { Response } from "express";
import httpStatus from "http-status-codes";


const NoDataFound = async (res: Response) => {
  sendResponse(res, {
    status: httpStatus.NOT_FOUND,
    success: false,
    message: "No Data Found",
    data: [],
  });
};

export default NoDataFound;