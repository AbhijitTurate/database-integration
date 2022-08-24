import { Request , Response ,NextFunction, RequestHandler} from "express";
import { CustomRequest } from "../interfaces/CustomRequest";
import Task from "../models/Task";
import AppError from "../utils/AppError";


const isAvailable= async (req:CustomRequest, res:Response, next:NextFunction)=>{
    const{
        params: {id}
    }=req;
    try{
       
        let task = await Task.findOne({id:id})
        if(!task){
            return next(new AppError(404, `Task with id ${id} not found`));
        }
        
        req.task =task;
        next()
    }
    catch(err){
        return next(new AppError(400 , " Bad request"))
    }
}

export default isAvailable;