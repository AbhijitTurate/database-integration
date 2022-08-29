import { Request , Response , NextFunction } from "express";
import express from "express";
import uniqid from "uniqid";
import Task from "../models/Task";
import sendResponse from "../middlewares/sendResponse";
import AppError from "../utils/AppError";
import { TypedRequestQuery } from "../interfaces/configRequests";
import { CustomRequest } from "../interfaces/CustomRequest";
const app = express();


interface queryConfig{
    page:string,
    limit:number,
    otherProps:object[]
}

const getSpecificTasks = async (req : Request, res:Response, next :NextFunction) => {
  let  { page , limit, ...otherProps }  = req.query as unknown as queryConfig;

  let count = Number(limit)
  if (!count) {
    count = 10;
  }
  try {
    let totalPages = Math.ceil(
      (await Task.find({ ...otherProps })).length / count
    );
   
    if (!totalPages) {
      return next(new AppError(404, "Pages not found"));
    }

    let pageId = Number(page);
    if (!pageId) {
      pageId = 1;
    }
    if (pageId > totalPages) {
      return next(new AppError(500, "No result found"));
    }

    let query = Task.find({...otherProps}).skip(pageId * count -count).limit(count)
   
    query.then((data)=>{
      
      return sendResponse(req, res, {
        statusCode: 200,
        message: "todo tasks",
        payload: data,
      });
    })
  } catch (err) {
    return next(new AppError(400, "Bad request"));
  }
};


const getSingleTask = async (req : CustomRequest, res:Response, next :NextFunction) => {
 

  const id = req.params.id
 
  return sendResponse(req, res, {
    statusCode: 200,
    message: `task with id ${id}`,
    payload: req.task!,
  });
};

const addTask = async (req : Request, res:Response, next :NextFunction) => {
  const {
    body: { description },
  } = req;

  console.log("description in body:", req.body);
  try {
    const newTask = new Task({ id: uniqid(), description: description });
    console.log("new task", newTask);
    await newTask.save();
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Todo added sucessfully",
      payload: newTask,
    });
  } catch {
    return next(new AppError(400, "Bad request"));
  }
};

const deleteTask = async (req : Request, res:Response, next :NextFunction) => {
  const {
    params: { id },
  } = req;
 
  try {
    await Task.deleteOne({ id: id });
    return sendResponse(req, res, {
      statusCode: 200,
      message: `todo with id ${id} deleted`,
      payload: "",
    });
  } catch (err) {
    return next(new AppError(500, "internal error operation"));
  }
};

const updateTask = async (req :Request, res:Response, next :NextFunction) => {
  const { body: updateObject } = req;

  const {
    params: { id },
  } = req;
 
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: id },
      {
        $set: {
          description: updateObject.description,
          isComplete: updateObject.isComplete,
        },
        
      }, 
      { new: true }
    );

    return sendResponse(req, res, {
      statusCode: 200,
      message: `todo with id ${id} updated`,
      payload: updatedTask!,
    });
  } catch (err) {
    return next(new AppError(500, "internal error operation"));
  }
};


// // Route params
// const getAllTasks = async (req : Request, res:Response, next :NextFunction) => {
//   try {
//     let tasks = await Task.find().select("-__v -_id");
//     return sendResponse(req, res, {
//       statusCode: 200,
//       message: "Tasks",
//       payload: [...tasks],
//     });
//   } catch (err) {
//     return next(new AppError(500, " Error in fetching tasks"));
//   }
// };
export {
  getSpecificTasks,
  addTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
