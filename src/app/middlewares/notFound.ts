import  { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction)=>{
    return res.status(httpStatus.NOT_FOUND).json({
        success : false,
        message : 'Not Found',
        error:''
    })
}

export default notFound;