"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todoController_1 = require("../controller/todoController");
var taskValidators_1 = __importDefault(require("../middlewares/taskValidators"));
var todoRouter = (0, express_1.Router)();
// /todos
todoRouter.route("/?").get(todoController_1.getTaskWithAttri);
todoRouter.route("/").get(todoController_1.getAllTasks).post(todoController_1.addTask);
todoRouter.route("/:id").get(taskValidators_1.default, todoController_1.getSingleTask).delete(taskValidators_1.default, todoController_1.deleteTask).patch(taskValidators_1.default, todoController_1.updateTask);
todoRouter.route("/pages").get(todoController_1.getPage);
exports.default = todoRouter;
//# sourceMappingURL=todoRouter.js.map