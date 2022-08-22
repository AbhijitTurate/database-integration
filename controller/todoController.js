const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const uniqid = require("uniqid");
const Task = require("../models/Task");
const sendResponse = require("../middlewares/sendResponse");
const AppError = require("../utils/AppError");
const { log } = require("console");

// Query params
const getPage = async (req, res, next) => {
  const {
    query: { page },
  } = req;

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
    console.log("error message", err.message);
    return next(new AppError(400, "Bad request"));
  }
};

const getTaskWithAttri = async (req, res, next) => {
  let {
    query: { page,limit, ...otherProps },
  } = req;
  console.log("limit", limit);
  console.log("other props:", otherProps);
  // let resultPage =
  if(!limit){
    limit=10
  }
  try {
    let totalPages = Math.ceil((await Task.find({...otherProps})).length / limit);
    console.log("totalpages:",totalPages);
    if (!totalPages) {
      return next(new AppError(404, "Pages not found"));
    }
    let pageId = parseInt(page);
    if (!pageId) {
      pageId = 1;
    }
    if (pageId > totalPages) {
      return next(new AppError(500 , "No result found"))

    }
    console.log("page id:", pageId);
    let resultPage = await (
      await Task.find({...otherProps})
    ).slice(pageId * limit - limit, pageId * limit);
    console.log("otherProps length:", Object.keys(otherProps).length);
    if (Object.keys(otherProps).length) {
      console.log("finding element with particular attributes");
      let particularTask = await (
        await Task.find({...otherProps}))
      
      console.log("particulartask type", typeof particularTask);
     console.log("partcular task:",particularTask);
    }
    return sendResponse(req, res, {
      statusCode: 200,
      message: "todo tasks",
      payload: resultPage,
    });
  } catch (err) {
    console.log("error message", err.message);
    return next(new AppError(400, "Bad request"));
  }
};
// Route params
const getAllTasks = async (req, res, next) => {
  try {
    let tasks = await Task.find().select("-__v -_id");
    let firstFive = await (await Task.find()).slice(0, 10);
    // console.log("tasks length", firstFive);
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Tasks",
      payload: [...tasks],
    });
  } catch (err) {
    console.log("error", err.message);
    return next(new AppError(500, " Error in fetching tasks"));
  }
};

const getSingleTask = async (req, res, next) => {
  const {
    params: { id },
  } = req;

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

const addTask = async (req, res, next) => {
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

const deleteTask = async (req, res, next) => {
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
    console.log(err.message);
    return next(new AppError(500, "internal error operation"));
  }
};

const updateTask = async (req, res, next) => {
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
      payload: updatedTask,
    });
  } catch (err) {
    return next(new AppError(500, "internal error operation"));
  }
};
module.exports = {
  addTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  getPage,
  getTaskWithAttri,
};
