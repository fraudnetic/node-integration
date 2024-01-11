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
        if (action !== 'userInfo') {
            this._data.eventName = action;
        }
        let task = 'event';
        switch (action) {
            case 'registration':
            case 'login':
                task = 'event';
                break;
            case 'userInfo':
                task = 'user/info';
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
        this.addActionEvent('phoneNumberVerification');
    }
    emailVerification() {
        this.addActionEvent('emailVerification');
    }
    documentVerification() {
        this.addActionEvent('documentVerification');
    }
    passwordReset() {
        this.addActionEvent('passwordReset');
    }
    emailChange() {
        this.addActionEvent('emailChange');
    }
    phoneNumberChange() {
        this.addActionEvent('phoneNumberChange');
    }
    deposit() {
        this.addActionEvent('deposit');
    }
    withdraw() {
        this.addActionEvent('withdraw');
    }
    sportBet() {
        this.addActionEvent('sportBet');
    }
    casinoSpin() {
        this.addActionEvent('casinoSpin');
    }
    gameBet() {
        this.addActionEvent('gameBet');
    }
    userInfo(data) {
        this._data = {};
        this._data.userID = String(data.userID);
        this._data.version = String(data.version);
        this._data.affiliateID = String(data.affiliateID);
        this._data.affiliateName = String(data.affiliateName);
        this._data.country = String(data.country);
        this._data.email = String(data.email);
        this._data.fullName = String(data.fullName);
        this._data.isActive = Boolean(data.isActive);
        this._data.passwordHash = String(data.passwordHash);
        this._data.phoneNumber = String(data.phoneNumber);
        this._data.registrationAt = String(data.registrationAt);
        this._data.username = String(data.username);
        this.addActionEvent('userInfo');
    }
    p2pGameBet() {
        this.addActionEvent('p2pGameBet');
    }
}
exports.default = Collector;
