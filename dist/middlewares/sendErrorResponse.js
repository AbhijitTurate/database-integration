"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendErrorResponse = function (error, req, res, next) {
    var statusCode = error.statusCode, message = error.message;
    res.status(statusCode).json({ message: message });
};
exports.default = sendErrorResponse;
//# sourceMappingURL=sendErrorResponse.js.map