import express from 'express';
import { FraudneticInterface } from '../interface/server.configuration.interface';
import Request from './request';
declare global {
    namespace Express {
        interface Request {
            fraudnetic: FraudneticInterface;
        }
    }
}
export default class Express {
    private _request;
    constructor(request: Request);
    middleware(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
