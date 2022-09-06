
const sendResponse =(req , res , config)=>{
    const {statusCode , message , payload} = config;
    // console.log("config object:",config);
    res.status(statusCode).json({ message, data: payload });
}

module.exports = sendResponse;