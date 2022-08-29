// // create a schema
// 1.create a schema that defines a structure
// 2.create a model that will use the schema
// // export a model
import mongoose, { Schema , model} from "mongoose";
import  uniqid  from "uniqid";

enum taskStatus {
  notStarted ="NotStarted",
  processing = "Processing",
  blocked = "Blocked",
  completed = "Completed"
}
interface ITask{
  id: string,
  description:string,
  isComplete:boolean,
  status:string
}


const TaskScehma = new Schema({
  id: {
    type: String,
    default: uniqid(),
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
},
  {
    // _id: false,
    timestamps: true,
  });

const Task = model("Tasks", TaskScehma);

export default Task
