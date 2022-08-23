
const sendResponse =(req , res , config)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
    const {statusCode , message , payload} = config;
    // console.log("config object:",config);
    res.status(statusCode).json({ message, data: payload });
}

module.exports = sendResponse;