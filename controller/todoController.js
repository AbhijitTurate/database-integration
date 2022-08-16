const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const uniqid = require("uniqid")
const Task = require("../models/Task");
const sendResponse = require("../middlewares/sendResponse");
const AppError = require("../utils/AppError");


const addTask = async (req, res,next) => {
  const {
    body: { description },
  } = req;

  console.log("description in body:", description);
  try {
    const newTask = new Task({id:uniqid(), description: description });
    console.log("new task",newTask);
    await newTask.save();
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Todo added sucessfully",
      payload: newTask,
    });
  } catch {
    return next(new AppError(400 ,"Bad request"));
  }
};

const getAllTasks = async(req , res , next)=>{

  try{
  let tasks = await Task.find().select("-__v -_id")
    return sendResponse(req,res,{statusCode:200 , message:"Tasks", payload:[...tasks] });
  }catch(err){
    return next(new AppError(500 , " Error in fetching tasks"));
  }
}

const getSingleTask = async (req,res,next)=>{
  const{
    params: {id}
  } = req;

  try{
    const task = await Task.find({id: id}).select("-_id -__v");
    console.log("task:",task.length);
    if(task.length === 0){
    return next(new AppError(404 , `task with id ${id} not found`));  
    }
    
    return sendResponse(req , res ,{statusCode: 200 , message:`task with id ${id}`, payload:{...task}})
  }
  catch(err){
    return next(new AppError(500 , `internal operation error`));
  }
 
}

const deleteTask = async (req , res, next)=>{
  const{
    params : {id}
  } = req;
  try{
    const task = await Task.find({id:id});
    console.log("found task:",task);
    if(task.length === 0){
      return next(new AppError(404 , `task with id ${id} not found`));  
    }
   await Task.deleteOne({task});
    return sendResponse(req , res , {statusCode: 200 , message: `todo with id ${id} deleted`, payload:""})
  }catch(err){
    return next(new AppError(500 , "internal error operation"));
  }  
}

const updateTask = async (req, res , next) =>{
  const{
    body: updateObject
  }= req;

  const{
    params: {id}
  } = req;

  console.log("updateObject",updateObject.description);
  try{
    const task = await Task.find({id:id});
    console.log("found task:",task);
    if(task.length === 0){
      return next(new AppError(404 , `task with id ${id} not found`));  
    }
   await Task.updateOne({task},
    {$set : {description :updateObject.description}});
    console.log("task after updating",task);
    return sendResponse(req , res , {statusCode: 200 , message: `todo with id ${id} updated`, payload:task})
  }catch(err){
    return next(new AppError(500 , "internal error operation"));
  }  

}
module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask
};
