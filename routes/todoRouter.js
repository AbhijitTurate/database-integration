const {Router} = require("express");
const { addTask, getAllTasks, getSingleTask, deleteTask, updateTask } = require("../controller/todoController");

const todoRouter = Router();
// /todos
todoRouter.route("/").get(getAllTasks).post(addTask);
todoRouter.route("/:id").get(getSingleTask).delete(deleteTask).patch(updateTask)

module.exports = todoRouter;