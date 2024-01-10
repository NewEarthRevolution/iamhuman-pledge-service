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
exports.getLocationFromIp = void 0;
const axios_1 = __importDefault(require("axios"));
const getLocationFromIp = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.iplocation.net/?ip=${ip}`);
        const data = response.data;
        if (data && data.country_name && data.country_code2) {
            return {
                countryName: data.country_name,
                countryCodeISO: data.country_code2
            };
        }
        return null;
    }
    catch (error) {
        console.error(`Error fetching IP location: ${error}`);
        return null;
    }
});
exports.getLocationFromIp = getLocationFromIp;
exports.default = exports.getLocationFromIp;
