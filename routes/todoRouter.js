const {Router} = require("express");
const { addTask, getAllTasks, getSingleTask, deleteTask, updateTask , getPage } = require("../controller/todoController");
const isAvailable = require("../middlewares/taskValidators");

const todoRouter = Router();
// /todos
todoRouter.route("/pages").get(getPage);
todoRouter.route("/").get(getAllTasks).post(addTask);
todoRouter.route("/:id").get( isAvailable,getSingleTask).delete( isAvailable,deleteTask).patch(isAvailable ,updateTask)
todoRouter.route("/pages").get(getPage);
module.exports = todoRouter;