import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status-codes";
import { TRole } from "../Components/User/user.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../Components/User/user.model";



const auth = (...requiredRoles: TRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.substring(7);
      //checking if the token is given or not
      // console.log(token)
      
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      //checking if the token is valid or not
      // invalid token
  
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
  
      const { email, role } = decoded.jwtPayload;
      // console.log(decoded)
  
      const user = await User.findOne({email})
  
      //checking if the user is exist
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
      }
      //checking if the role from the token is same as the role from the permitted roles
    //   console.log(requiredRoles)
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      // console.log(decoded)
      req.user = decoded as JwtPayload;
      next();
    });
  };
  
  export default auth;