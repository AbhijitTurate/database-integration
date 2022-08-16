// // create a schema
// 1.create a schema that defines a structure
// 2.create a model that will use the schema
// // export a model
const uniqid = require("uniqid")
const mongoose = require("mongoose");

const TaskScehma = mongoose.Schema({
    id:{
        type: String,
        default: uniqid()
    },
    description: {
        type: String,
        required: [true , "Description cant be empty"],
        minLength: [4,"Description minimum length should be greater than 4 characters"]
    }
})

const Task = mongoose.model("Tasks" , TaskScehma);

module.exports = Task;