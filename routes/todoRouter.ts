import { Router } from "express";
import { addTask, getAllTasks, getSingleTask, deleteTask, updateTask, getPage, getTaskWithAttri } from "../controller/todoController";
import isAvailable from "../middlewares/taskValidators";

const todoRouter = Router();
// /todos
todoRouter.route("/?").get(getTaskWithAttri);
todoRouter.route("/").get(getAllTasks).post(addTask);
todoRouter.route("/:id").get(isAvailable, getSingleTask).delete(isAvailable, deleteTask).patch(isAvailable, updateTask)
todoRouter.route("/pages").get(getPage);
export default todoRouter
