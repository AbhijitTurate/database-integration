const {Router} = require("express");
const { addTask, getAllTasks, getSingleTask, deleteTask, updateTask , getPage, getTaskWithAttri } = require("../controller/todoController");
const isAvailable = require("../middlewares/taskValidators");

const todoRouter = Router();
// /todos
todoRouter.route("/?").get(getTaskWithAttri);
todoRouter.route("/").get(getAllTasks).post(addTask);
todoRouter.route("/:id").get( isAvailable,getSingleTask).delete( isAvailable,deleteTask).patch(isAvailable ,updateTask)
todoRouter.route("/pages").get(getPage);
module.exports = todoRouter;