"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendResponse = function (req, res, config) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
    var statusCode = config.statusCode, message = config.message, payload = config.payload;
    res.status(statusCode).json({ message: message, data: payload });
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map