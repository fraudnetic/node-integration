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
const hash_1 = __importDefault(require("./hash"));
const https_1 = __importDefault(require("https"));
const http = __importStar(require("http"));
class Request {
    constructor(_server, _key, _secret, secure = true) {
        if (secure === undefined)
            secure = true;
        this._secure = secure;
        this._server = _server;
        this._key = _key;
        this._secret = _secret;
        this.request = this.request.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }
    // make request input json data and return response
    makeRequest(data, task = 'event') {
        return __awaiter(this, void 0, void 0, function* () {
            // generate hash
            const hash = hash_1.default.generate(JSON.stringify(data), this._key, this._secret);
            // get servers
            const servers = this._server;
            // get random server
            const server = servers[Math.floor(Math.random() * servers.length)];
            // make request
            // return response
            return yield this.request(server, data, hash, task);
        });
    }
    request(server, data, hash, task = 'event') {
        // we will make https request to server using Node.js native tools for best performance
        return new Promise((resolve, reject) => {
            try {
                let req;
                let port = 443;
                // check if server has port
                if (server.includes(':')) {
                    const parts = server.split(':');
                    server = parts[0];
                    port = parseInt(parts[1]);
                }
                if (this._secure) {
                    req = https_1.default.request({
                        hostname: server,
                        method: 'POST',
                        path: `/${task}`,
                        port,
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                            Hash: hash.hash,
                            Timestamp: hash.time,
                        },
                    });
                }
                else {
                    if (port === 443) {
                        port = 80;
                    }
                    req = http.request({
                        hostname: server,
                        method: 'POST',
                        port,
                        path: `/${task}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                            Hash: hash.hash,
                            Timestamp: hash.time,
                        },
                    });
                }
                req.write(JSON.stringify(data));
                req.end();
                req
                    .on('error', (error) => {
                    reject({
                        error: true,
                        message: error.message,
                    });
                })
                    .on('response', (response) => {
                    // we will get response from server
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on('end', () => {
                        // we will parse response
                        const parsed = JSON.parse(data);
                        resolve(parsed);
                    });
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = Request;
