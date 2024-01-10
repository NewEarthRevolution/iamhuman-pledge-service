"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
require("./services/pledgeChangeStream");
require("./services/pledgePublisher");
console.log('MongoDB URI in server.ts:', process.env.MONGO_URI);
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
