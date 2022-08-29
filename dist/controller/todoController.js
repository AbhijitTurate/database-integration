"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.getSingleTask = exports.addTask = exports.getSpecificTasks = void 0;
var express_1 = __importDefault(require("express"));
var uniqid_1 = __importDefault(require("uniqid"));
var Task_1 = __importDefault(require("../models/Task"));
var sendResponse_1 = __importDefault(require("../middlewares/sendResponse"));
var AppError_1 = __importDefault(require("../utils/AppError"));
var app = (0, express_1.default)();
var getSpecificTasks = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, limit, otherProps, count, totalPages, _b, _c, pageId, query, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, page = _a.page, limit = _a.limit, otherProps = __rest(_a, ["page", "limit"]);
                count = Number(limit);
                if (!count) {
                    count = 10;
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                _c = (_b = Math).ceil;
                return [4 /*yield*/, Task_1.default.find(__assign({}, otherProps))];
            case 2:
                totalPages = _c.apply(_b, [(_d.sent()).length / count]);
                if (!totalPages) {
                    return [2 /*return*/, next(new AppError_1.default(404, "Pages not found"))];
                }
                pageId = Number(page);
                if (!pageId) {
                    pageId = 1;
                }
                if (pageId > totalPages) {
                    return [2 /*return*/, next(new AppError_1.default(500, "No result found"))];
                }
                query = Task_1.default.find(__assign({}, otherProps)).skip(pageId * count - count).limit(count);
                query.then(function (data) {
                    return (0, sendResponse_1.default)(req, res, {
                        statusCode: 200,
                        message: "todo tasks",
                        payload: data,
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                return [2 /*return*/, next(new AppError_1.default(400, "Bad request"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSpecificTasks = getSpecificTasks;
var getSingleTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        return [2 /*return*/, (0, sendResponse_1.default)(req, res, {
                statusCode: 200,
                message: "task with id ".concat(id),
                payload: req.task,
            })];
    });
}); };
exports.getSingleTask = getSingleTask;
var addTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var description, newTask, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                description = req.body.description;
                console.log("description in body:", req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newTask = new Task_1.default({ id: (0, uniqid_1.default)(), description: description });
                console.log("new task", newTask);
                return [4 /*yield*/, newTask.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, (0, sendResponse_1.default)(req, res, {
                        statusCode: 200,
                        message: "Todo added sucessfully",
                        payload: newTask,
                    })];
            case 3:
                _a = _b.sent();
                return [2 /*return*/, next(new AppError_1.default(400, "Bad request"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addTask = addTask;
var deleteTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Task_1.default.deleteOne({ id: id })];
            case 2:
                _a.sent();
                return [2 /*return*/, (0, sendResponse_1.default)(req, res, {
                        statusCode: 200,
                        message: "todo with id ".concat(id, " deleted"),
                        payload: "",
                    })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, next(new AppError_1.default(500, "internal error operation"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
var updateTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateObject, id, updatedTask, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateObject = req.body;
                id = req.params.id;
                console.log("updateObject", updateObject.description);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Task_1.default.findOneAndUpdate({ id: id }, {
                        $set: {
                            description: updateObject.description,
                            isComplete: updateObject.isComplete,
                        },
                    }, { new: true })];
            case 2:
                updatedTask = _a.sent();
                return [2 /*return*/, (0, sendResponse_1.default)(req, res, {
                        statusCode: 200,
                        message: "todo with id ".concat(id, " updated"),
                        payload: updatedTask,
                    })];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(new AppError_1.default(500, "internal error operation"))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTask = updateTask;
//# sourceMappingURL=todoController.js.map