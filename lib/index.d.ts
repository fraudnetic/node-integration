import express from 'express';
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
export declare class Fraudnetic {
    private request;
    express: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
    fastify: (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => void;
    constructor(options: {
        servers: string[];
        key: string;
        secret: string;
        secure?: boolean;
    });
}
