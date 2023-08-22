"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Hash {
    static generate(data, key, secret) {
        // we generate hash and encode it to base64
        const time = Date.now().toString();
        const hash = (0, crypto_1.createHash)('sha256')
            .update(data + secret + key + time)
            .digest('base64');
        // if debug print hash
        if (process.env.NODE_ENV === 'development') {
            console.log(`Data: ${data}`);
            console.log(`Key: ${key}`);
            console.log(`Secret: ${secret}`);
            console.log(`Hash: ${hash}`);
            console.log(`Time: ${time}`);
        }
        return { hash, time };
    }
}
exports.default = Hash;
