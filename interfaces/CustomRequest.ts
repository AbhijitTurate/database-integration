import { Request } from "express";
import Task from "../models/Task";
interface CustomRequest extends Request{
task?:object
}

export {CustomRequest}