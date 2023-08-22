"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collector {
    set data(data) {
        this._data = data;
    }
    get request() {
        return this._request;
    }
    constructor(request) {
        this._data = {};
        this.test = 'test';
        this._request = request;
        this.addActionEvent = this.addActionEvent.bind(this);
        this.user = this.user.bind(this);
        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
        this.phoneNumberVerification = this.phoneNumberVerification.bind(this);
        this.emailVerification = this.emailVerification.bind(this);
        this.documentVerification = this.documentVerification.bind(this);
        this.passwordReset = this.passwordReset.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.phoneNumberChange = this.phoneNumberChange.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.sportBet = this.sportBet.bind(this);
        this.casinoSpin = this.casinoSpin.bind(this);
        this.gameBet = this.gameBet.bind(this);
        this.p2pGameBet = this.p2pGameBet.bind(this);
    }
    addActionEvent(action) {
        this._data.event = action;
        let task = 'event';
        switch (action) {
            case 'registration':
            case 'login':
                task = 'event';
                break;
        }
        this.request
            .makeRequest(this._data, task)
            .then((response) => {
            if (process.env.NODE_ENV === 'development') {
                console.log(response);
            }
        })
            .catch((error) => {
            // if debug enabled
            if (process.env.NODE_ENV === 'development') {
                console.log(error);
            }
        });
    }
    user(userID) {
        this._data.userID = String(userID);
        return this;
    }
    registration() {
        this.addActionEvent('registration');
    }
    login() {
        this.addActionEvent('login');
    }
    phoneNumberVerification() {
        this.addActionEvent('phone_number_verification');
    }
    emailVerification() {
        this.addActionEvent('email_verification');
    }
    documentVerification() {
        this.addActionEvent('document_verification');
    }
    passwordReset() {
        this.addActionEvent('password_reset');
    }
    emailChange() {
        this.addActionEvent('email_change');
    }
    phoneNumberChange() {
        this.addActionEvent('phone_number_change');
    }
    deposit() {
        this.addActionEvent('deposit');
    }
    withdraw() {
        this.addActionEvent('withdraw');
    }
    sportBet() {
        this.addActionEvent('sport_bet');
    }
    casinoSpin() {
        this.addActionEvent('casino_spin');
    }
    gameBet() {
        this.addActionEvent('game_bet');
    }
    p2pGameBet() {
        this.addActionEvent('p2p_game_bet');
    }
}
exports.default = Collector;
