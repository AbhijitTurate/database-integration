const {Router} = require("express");
const { addTask, getAllTasks, getSingleTask, deleteTask, updateTask } = require("../controller/todoController");
const isAvailable = require("../middlewares/validators");

const todoRouter = Router();
// /todos
todoRouter.route("/").get(getAllTasks).post(addTask);
todoRouter.route("/:id").get( isAvailable,getSingleTask).delete( isAvailable,deleteTask).patch(isAvailable ,updateTask)

module.exports = todoRouter;