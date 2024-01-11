import { qObject } from '../interface/server.configuration.interface';
import Request from './request';
export default class Collector {
    private _data;
    private _request;
    test: string;
    set data(data: qObject);
    get request(): Request;
    constructor(request: Request);
    addActionEvent(action: string): void;
    user(userID: string | number): Collector;
    registration(): void;
    login(): void;
    phoneNumberVerification(): void;
    emailVerification(): void;
    documentVerification(): void;
    passwordReset(): void;
    emailChange(): void;
    phoneNumberChange(): void;
    deposit(): void;
    withdraw(): void;
    sportBet(): void;
    casinoSpin(): void;
    gameBet(): void;
    p2pGameBet(): void;
}
