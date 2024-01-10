"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pledgeService = __importStar(require("../services/pledgeService"));
const Pledge_1 = __importDefault(require("../models/Pledge")); // Adjust import path as needed
const router = express_1.default.Router();
router.post('/pledges', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientIp = grabIpFromReq(req);
        const newPledge = yield pledgeService.createPledge(req.body, "147.235.221.149");
        res.status(201).json(newPledge);
    }
    catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
router.get('/latest-pledges', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestPledges = yield Pledge_1.default.find()
            .sort({ createdAt: -1 })
            .limit(10) // Adjust the limit as needed
            .select('name location.countryName -_id');
        res.json(latestPledges);
    }
    catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
router.get('/name-map', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameMap = yield Pledge_1.default.find()
            .sort({ createdAt: -1 })
            .limit(20) // Adjust based on your requirement
            .select('name location.countryName -_id'); // Fetch names and country names
        res.json(nameMap);
    }
    catch (error) {
        // Check if error is an instance of Error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
const grabIpFromReq = (req) => {
    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (Array.isArray(clientIp)) {
        // Filter out IPv6 addresses
        clientIp = clientIp.find(ip => ip.includes('.') && !ip.includes(':'));
    }
    else if (typeof clientIp === 'string' && clientIp.includes(',')) {
        // Split and filter if the header is a string with multiple IPs
        const ips = clientIp.split(',').map(ip => ip.trim());
        clientIp = ips.find(ip => ip.includes('.') && !ip.includes(':'));
    }
    return clientIp || '0.0.0.0';
};
exports.default = router;
