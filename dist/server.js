"use strict";
// connection to db
// start app
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
var sendErrorResponse_1 = __importDefault(require("./middlewares/sendErrorResponse"));
dotenv_1.default.config();
var _a = process.env, DB_LOCAL = _a.DB_LOCAL, PORT = _a.PORT;
app_1.default.use(sendErrorResponse_1.default);
mongoose_1.default
    .connect('mongodb://localhost:27017/Training-Class-2022', {})
    .then(function (connection) {
    return app_1.default.listen(PORT || 3000, function () {
        console.log("server started on port", PORT);
    });
})
    .catch(function (err) {
    console.log("Error in connecting", err);
});
//# sourceMappingURL=server.js.map