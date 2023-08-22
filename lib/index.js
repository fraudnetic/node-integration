"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fraudnetic = void 0;
const request_1 = __importDefault(require("./helpers/request"));
const express_1 = __importDefault(require("./helpers/express"));
const fastify_1 = __importDefault(require("./helpers/fastify"));
class Fraudnetic {
    constructor(options) {
        this.request = new request_1.default(options.servers, options.key, options.secret, options.secure);
        this.express = new express_1.default(this.request).middleware;
        this.fastify = new fastify_1.default(this.request).middleware;
    }
}
exports.Fraudnetic = Fraudnetic;
