import { Request } from "express";
interface CustomRequest extends Request{
task?:any
}

export {CustomRequest}