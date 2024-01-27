import { FraudneticInterface } from '../interface/server.configuration.interface';
import Request from './request';
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        fraudnetic: FraudneticInterface;
    }
}
export default class Fastify {
    private _request;
    constructor(request: Request);
    middleware(req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction): void;
}
