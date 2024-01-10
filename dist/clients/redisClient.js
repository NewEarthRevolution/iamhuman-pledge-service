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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
require('dotenv').config();
class RedisClient {
    constructor() {
        this.reconnectAttempts = 0;
        this.client = (0, redis_1.createClient)({ url: process.env.REDIS_URI });
        this.initializeEventHandlers();
    }
    initializeEventHandlers() {
        this.client.on('connect', () => {
            console.log('Redis client connected');
            this.reconnectAttempts = 0;
        });
        this.client.on('error', (error) => {
            console.error('Redis error:', error);
            this.attemptReconnect();
        });
        this.client.on('end', () => {
            console.log('Redis client disconnected');
        });
    }
    attemptReconnect() {
        this.reconnectAttempts++;
        const delay = Math.min(100 * 2 ** this.reconnectAttempts, 30000);
        console.log(`Attempting to reconnect in ${delay} ms`);
        setTimeout(() => this.connect(), delay);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
            }
            catch (error) {
                console.error('Failed to connect to Redis:', error);
                this.attemptReconnect();
            }
        });
    }
    quit() {
        this.client.quit();
    }
    publish(channel, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.isOpen) {
                yield this.client.connect();
            }
            yield this.client.publish(channel, message);
        });
    }
}
const redisClientInstance = new RedisClient();
// Graceful Shutdown
const cleanup = () => {
    console.log('Cleaning up before shutdown...');
    redisClientInstance.quit();
    console.log('Cleanup completed. Shutting down.');
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
exports.default = redisClientInstance;
