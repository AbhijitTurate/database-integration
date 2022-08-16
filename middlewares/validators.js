const Task = require("../models/Task");
const AppError = require("../utils/AppError");

const isAvailable = async (req , res, next)=>{
    const{
        params: {id}
    }=req;
    try{
        let task = await Task.find({id:id})
        if(!task.length){
            return next(new AppError(404, `Task with id ${id} not found`));
        }
        req.task =task;
        next()
    }
    catch(err){
        return next(new AppError(400 , " Bad request"))
    }
}

module.exports = isAvailable;