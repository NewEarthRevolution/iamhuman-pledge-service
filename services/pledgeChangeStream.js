"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChangeStream = void 0;
const Pledge_1 = __importDefault(require("../models/Pledge"));
const pledgePublisher_1 = require("./pledgePublisher");
const startChangeStream = () => {
    const changeStream = Pledge_1.default.watch();
    console.log("watching database");
    changeStream.on('change', (change) => {
        console.log("noticed change in mongo");
        if (change.operationType === 'insert') {
            const newPledge = change.fullDocument;
            const message = {
                name: newPledge.name,
                countryName: newPledge.location.countryName
            };
            (0, pledgePublisher_1.publishToFeedService)(message);
        }
    });
};
exports.startChangeStream = startChangeStream;
// db.createUser({
//   user: "root",
//   pwd: "root",
//   roles: [{ role: "root", db: "admin" }]
// });
