import { Router } from "express";
import { addTask, getSingleTask, deleteTask, updateTask, getSpecificTasks } from "../controller/todoController";
import isAvailable from "../middlewares/taskValidators";

const todoRouter = Router();
// /todos
todoRouter.route("/?").get(getSpecificTasks);
todoRouter.route("/").post(addTask);
todoRouter.route("/:id").get(isAvailable, getSingleTask).delete(isAvailable, deleteTask).patch(isAvailable, updateTask)
// todoRouter.route("/pages").get(getPage);
export default todoRouter
