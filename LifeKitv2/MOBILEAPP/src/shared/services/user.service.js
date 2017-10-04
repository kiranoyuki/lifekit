"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var user_model_1 = require("../models/user.model");
var UserService = (function () {
    function UserService(apiService, http, jwtService) {
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.currentUserSubject = new BehaviorSubject_1.BehaviorSubject(new user_model_1.User());
        this.currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
        this.isAuthenticatedSubject = new ReplaySubject_1.ReplaySubject(1);
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
    }
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    UserService.prototype.populate = function () {
        var _this = this;
        // todo: revisit this again
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getRefreshToken()) {
            this.apiService.get('/user')
                .subscribe(function (data) { return _this.setAuth(data.user); }, function (err) { return _this.purgeAuth(); });
        }
        else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    };
    UserService.prototype.isRegistered = function () {
        if (this.jwtService.getRefreshToken()) {
            return (true);
        }
        else {
            return (false);
        }
    };
    UserService.prototype.setAuth = function (accessToken) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveAccessToken(accessToken);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    };
    UserService.prototype.purgeAuth = function () {
        // Remove JWT from localstorage
        this.jwtService.destroyRefreshToken();
        this.jwtService.destroyAccessToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new user_model_1.User());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    };
    UserService.prototype.signup = function (phone) {
        var path = "/user/signup?phone=" + phone;
        this.currentUserSubject.value.phone = phone;
        return this.apiService.get(path);
    };
    UserService.prototype.validate = function (code) {
        return this._validate(this.currentUserSubject.value.phone, code);
    };
    UserService.prototype._validate = function (phone, code) {
        var _this = this;
        var path = "/user/validate?phone=" + phone + "&code=" + code;
        return this.apiService.get(path)
            .map(function (res) {
            // save the refresh token for use in acquiring access token
            _this.jwtService.saveRefreshToken(res.result);
            _this.jwtService.saveTelephoneNumber(phone);
            return true;
        }, function (err) { return false; });
    };
    UserService.prototype.signin = function () {
        return this._signin(this.jwtService.getTelephoneNumber(), this.jwtService.getRefreshToken());
    };
    UserService.prototype._signin = function (phone, token) {
        var _this = this;
        var path = "/user/signin?phone=" + phone + "&refreshToken=" + token;
        return this.apiService.get(path)
            .map(function (res) {
            // Save the access token
            _this.jwtService.saveAccessToken(res.result);
            // mark this user as signed in
            _this.isAuthenticatedSubject.next(true);
            return res; // in case someone else needs it
        });
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUserSubject.value;
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
