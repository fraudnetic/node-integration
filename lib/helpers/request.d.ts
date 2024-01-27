import { qObject } from '../interface/server.configuration.interface';
export default class Request {
    private _server;
    private _key;
    private _secret;
    private _secure;
    constructor(_server: string[], _key: string, _secret: string, secure?: boolean);
    makeRequest(data: qObject, task?: string): Promise<{
        error: boolean;
        message: string;
    }>;
    request(server: string, data: qObject, hash: {
        hash: string;
        time: string;
    }, task?: string): Promise<{
        error: boolean;
        message: string;
    }>;
}
