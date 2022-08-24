"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var todoRouter_1 = __importDefault(require("./routes/todoRouter"));
var sendErrorResponse_1 = __importDefault(require("./middlewares/sendErrorResponse"));
// dotenv.config();
var app = (0, express_1.default)();
app.use(sendErrorResponse_1.default);
app.use(express_1.default.json());
app.use("/todos", todoRouter_1.default);
// app.get("*",(req,res)=>{
//     res.status(404).json({message : "Data not found"})
// })
// app.listen(process.env.PORT || 3000 , ()=>{
//     console.log("server running on port",process.env.PORT);
// }) 
exports.default = app;
//# sourceMappingURL=app.js.map