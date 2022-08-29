"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // create a schema
// 1.create a schema that defines a structure
// 2.create a model that will use the schema
// // export a model
var mongoose_1 = require("mongoose");
var uniqid_1 = __importDefault(require("uniqid"));
var taskStatus;
(function (taskStatus) {
    taskStatus["notStarted"] = "NotStarted";
    taskStatus["processing"] = "Processing";
    taskStatus["blocked"] = "Blocked";
    taskStatus["completed"] = "Completed";
})(taskStatus || (taskStatus = {}));
var TaskScehma = new mongoose_1.Schema({
    id: {
        type: String,
        default: (0, uniqid_1.default)(),
    },
    description: {
        type: String,
        required: [true, "Description cant be empty"],
        minLength: [
            4,
            "Description minimum length should be greater than 4 characters",
        ],
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: taskStatus.notStarted
    },
}, {
    // _id: false,
    timestamps: true,
});
var Task = (0, mongoose_1.model)("Tasks", TaskScehma);
exports.default = Task;
//# sourceMappingURL=Task.js.map