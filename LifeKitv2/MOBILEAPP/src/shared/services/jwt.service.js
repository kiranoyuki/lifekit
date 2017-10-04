"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var JwtService = (function () {
    function JwtService() {
    }
    JwtService.prototype.saveTelephoneNumber = function (phone) {
        window.localStorage['phone'] = phone;
    };
    JwtService.prototype.getTelephoneNumber = function () {
        return (window.localStorage['phone']);
    };
    JwtService.prototype.getRefreshToken = function () {
        return window.localStorage['refToken'];
    };
    JwtService.prototype.saveRefreshToken = function (token) {
        window.localStorage['refToken'] = token;
    };
    JwtService.prototype.destroyRefreshToken = function () {
        window.localStorage.removeItem('refToken');
    };
    JwtService.prototype.getAccessToken = function () {
        return window.localStorage["accessToken"];
    };
    JwtService.prototype.saveAccessToken = function (token) {
        window.localStorage['accessToken'] = token;
    };
    JwtService.prototype.destroyAccessToken = function () {
        window.localStorage.removeItem('accessToken');
    };
    JwtService = __decorate([
        core_1.Injectable()
    ], JwtService);
    return JwtService;
}());
exports.JwtService = JwtService;
