"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pledgeRoutes_1 = __importDefault(require("./routes/pledgeRoutes"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log("connecting to database");
(0, database_1.default)();
app.use('/api', pledgeRoutes_1.default);
exports.default = app;
