import express from "express";

import todoRouter from "./routes/todoRouter";
import sendErrorResponse from "./middlewares/sendErrorResponse";

// dotenv.config();

const app = express();

app.use(sendErrorResponse);
app.use(express.json());
app.use("/todos",todoRouter);




// app.get("*",(req,res)=>{
//     res.status(404).json({message : "Data not found"})
// })

// app.listen(process.env.PORT || 3000 , ()=>{
//     console.log("server running on port",process.env.PORT);
// }) 

export default app
