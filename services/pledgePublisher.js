"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToFeedService = void 0;
const redisClient_1 = __importDefault(require("../clients/redisClient"));
// Connect when your application starts
redisClient_1.default.connect();
const publishToFeedService = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedMessage = JSON.stringify(message);
    console.log("publishing", message);
    yield redisClient_1.default.publish('pledgeUpdates', serializedMessage);
});
exports.publishToFeedService = publishToFeedService;
