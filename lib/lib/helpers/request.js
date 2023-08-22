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
const hash_1 = __importDefault(require("./hash"));
const https_1 = __importDefault(require("https"));
class Request {
    constructor(_server, _key, _secret) {
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
            const req = https_1.default.request({
                hostname: server,
                method: 'POST',
                path: `/${task}`,
                headers: {
                    'Content-Type': 'application/json',
                    Hash: hash.hash,
                    Timestamp: hash.time,
                },
            });
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
        });
    }
}
exports.default = Request;
