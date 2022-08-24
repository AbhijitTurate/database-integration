import { Request , Response , NextFunction } from "express";
import express from "express";
import uniqid from "uniqid";
import Task from "../models/Task";
import sendResponse from "../middlewares/sendResponse";
import AppError from "../utils/AppError";
import { TypedRequestQuery } from "../interfaces/configRequests";
import { CustomRequest } from "../interfaces/CustomRequest";
const app = express();

// Query params
const getPage = async (req : Request, res:Response, next :NextFunction) => {
  // const {
  //   query: { page } ,
  // } = req;

  const page = (req.query as {page: string}).page
  let resultPage = {};
  try {
    let totalPages = (await Task.find()).length / 10;
    if (!totalPages) {
      return next(new AppError(404, "Pages not found"));
    }
    let pageId = parseInt(page);
    if (!pageId) {
      pageId = 1;
    }
    if (pageId > totalPages) {
      pageId = totalPages;
    }
    console.log("page id:", pageId);
    resultPage = await (await Task.find()).slice(pageId * 10 - 10, pageId * 10);
    // console.log("page found",page);
    return sendResponse(req, res, {
      statusCode: 200,
      message: "todo tasks",
      payload: resultPage,
    });
  } catch (err) {
    if(err instanceof Error){
    console.log("error message", err.message);

    }else{
      console.log("error message", err);
    }
    return next(new AppError(400, "Bad request"));
  }
};

interface queryConfig{
    page:string,
    limit:number,
    otherProps:object[]
}

const getTaskWithAttri = async (req : Request, res:Response, next :NextFunction) => {
  let  { page , limit, ...otherProps }  = req.query as unknown as queryConfig;
  // let page = (req.query as {page:string}).page;
  // let limit = (req.query as {limit:string}).limit
  // let otherProps = (req.query as {otherProps:object}).otherProps
  console.log("limit", limit);
  console.log("other props:", otherProps);
 
  let count = Number(limit)
  if (!count) {
    count = 10;
  }
  try {
    let totalPages = Math.ceil(
      (await Task.find({ ...otherProps })).length / count
    );
    console.log("totalpages:", totalPages);
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
      console.log("Type of payload:",typeof data);
      
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
// Route params
const getAllTasks = async (req : Request, res:Response, next :NextFunction) => {
  try {
    let tasks = await Task.find().select("-__v -_id");
   
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Tasks",
      payload: [...tasks],
    });
  } catch (err) {
   
    return next(new AppError(500, " Error in fetching tasks"));
  }
};

const getSingleTask = async (req : CustomRequest, res:Response, next :NextFunction) => {
 

  const id = req.params.id
  // try{
  //   const task = await Task.find({id: id}).select("-_id -__v");
  //   console.log("task:",task.length);
  //   if(task.length === 0){
  //   return next(new AppError(404 , `task with id ${id} not found`));
  //   }

  //   return sendResponse(req , res ,{statusCode: 200 , message:`task with id ${id}`, payload:{...task}})
  // }
  // catch(err){
  //   return next(new AppError(500 , `internal operation error`));
  // }

  return sendResponse(req, res, {
    statusCode: 200,
    message: `task with id ${id}`,
    payload: req.task,
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

const deleteTask = async (req : CustomRequest, res:Response, next :NextFunction) => {
  const {
    params: { id },
  } = req;
  let task = req.task;

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

const updateTask = async (req : CustomRequest, res:Response, next :NextFunction) => {
  const { body: updateObject } = req;

  const {
    params: { id },
  } = req;
  let task = req.task;

  console.log("updateObject", updateObject.description);
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: id },
      {
        $set: {
          description: updateObject.description,
          isComplete: updateObject.isComplete,
        },
        //  {isComplete:updateObject.isComplete }
      }, //{...task , {updatedObject}}
      { new: true }
    );

    //  task = {...task, description : updateObject.description }
    //  await task.save();
    return sendResponse(req, res, {
      statusCode: 200,
      message: `todo with id ${id} updated`,
      payload: updatedTask!,
    });
  } catch (err) {
    return next(new AppError(500, "internal error operation"));
  }
};
export {
  addTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  getPage,
  getTaskWithAttri,
};
