import { Request ,Response, NextFunction } from "express";
import AppError from "../utils/AppError";
const sendErrorResponse = (error:AppError, req :Request, res : Response , next :NextFunction) =>{
    const {statusCode , message}= error;
    res.status(statusCode).json({message});
}

export default sendErrorResponse