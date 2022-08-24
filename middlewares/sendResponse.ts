import { Request ,Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/CustomRequest";

const sendResponse =(req:Request | CustomRequest, res:Response , config: { statusCode: number; message: String; payload: object|string })=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
    const {statusCode , message , payload} = config;
    
    res.status(statusCode).json({ message, data: payload });
}

export default sendResponse