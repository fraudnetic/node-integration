"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const collector_1 = __importDefault(require("./collector"));
// we should write express middleware to obtain headers and build request object
class Express {
    constructor(request) {
        this._request = request;
        this.middleware = this.middleware.bind(this);
    }
    middleware(req, res, next) {
        const requestObject = {};
        // assign collector to express request
        req.fraudnetic = new collector_1.default(this._request);
        // get ip
        requestObject.ip = req.headers['x-forwarded-for'] || req.ip;
        // get user agent
        requestObject.userAgent = req.headers['user-agent'];
        // we loop each header and try to decode from base64 if we find fraudnetic key we will use values and quit loop
        for (let i = 0; i < req.rawHeaders.length; i++) {
            try {
                const value = Buffer.from(req.rawHeaders[i], 'base64').toString('utf-8');
                const object = JSON.parse(value);
                if (object && object['fraudnetic']) {
                    // we found fraudnetic key
                    requestObject.browserFingerprint = object['browserFingerprint'];
                    requestObject.deviceTimezone = object['deviceTimezone'];
                    requestObject.deviceLanguage = object['deviceLanguage'];
                    requestObject.incognito = object['isIncognito'];
                    break;
                }
            }
            catch (error) {
                // if debug enabled
                if (process.env.NODE_ENV === 'development') {
                    console.log(error);
                }
            }
        }
        // add request object to collector
        req.fraudnetic.data = requestObject;
        next();
    }
}
exports.default = Express;
