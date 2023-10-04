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
        // we loop each header and try to decode from base64 if we find fraudnetic key we will use values and quit loop
        for (let i = 0; i < req.rawHeaders.length; i++) {
            try {
                const value = Buffer.from(req.rawHeaders[i], 'base64').toString('utf-8');
                const object = JSON.parse(value);
                // fraudnetic: '1',
                //   browserFingerprint,
                //   canvasFingerprint,
                //   webGLFingerprint,
                //   screenResolution,
                //   session: Config.sessionID,
                //   isIncognito,
                //   deviceTimezone: getDate.getTimezoneOffset(),
                //   deviceLanguage: navigator.language,
                //   periodicWave,
                //   fontFingerprint,
                //   storage: storageQ.quota,
                //   time,
                if (object && object['fraudnetic']) {
                    // we found fraudnetic key
                    requestObject.userID = '';
                    requestObject.browserFingerprint = object['browserFingerprint'].toString();
                    requestObject.canvasFingerprint = object['canvasFingerprint'].toString();
                    requestObject.webGLFingerprint = object['webGLFingerprint'].toString();
                    requestObject.screenResolution = object['screenResolution'].toString();
                    requestObject.session = object['session'].toString();
                    requestObject.periodicWave = object['periodicWave'].toString();
                    requestObject.fontFingerprint = object['fontFingerprint'].toString();
                    requestObject.storage = object['storage'].toString();
                    // get user agent
                    requestObject.userAgent = req.headers['user-agent'];
                    requestObject.incognito = object['isIncognito'];
                    // get ip
                    requestObject.ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;
                    requestObject.ip = String(requestObject.ip).split(',')[0];
                    // replace ::ffff: with empty string
                    requestObject.ip = requestObject.ip.replace('::ffff:', '');
                    if (requestObject.ip === '::1') {
                        requestObject.ip = '127.0.0.1';
                    }
                    if (req.query) {
                        if (req.query.utm_source) {
                            requestObject.utm = req.query.utm_source;
                        }
                        else if (req.query.utm) {
                            requestObject.utm = req.query.utm;
                        }
                        else {
                            requestObject.utm = '';
                        }
                    }
                    else {
                        requestObject.utm = '';
                    }
                    requestObject.eventName = '';
                    requestObject.deviceTimezone = object['deviceTimezone'];
                    requestObject.deviceLanguage = object['deviceLanguage'];
                    break;
                }
            }
            catch (error) {
                // we ignore error
            }
        }
        // add request object to collector
        req.fraudnetic.data = requestObject;
        next();
    }
}
exports.default = Express;
