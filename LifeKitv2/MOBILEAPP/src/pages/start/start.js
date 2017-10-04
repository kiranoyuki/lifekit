"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Start = (function () {
    function Start(userService, alerCtrl, navCtrl) {
        var _this = this;
        this.userService = userService;
        this.alerCtrl = alerCtrl;
        this.navCtrl = navCtrl;
        //window.localStorage.clear();
        setTimeout(function () {
            _this.goNextPageAuth();
        }, 1000);
    }
    Start.prototype.goNextPageAuth = function () {
        var _this = this;
        var res = this.userService.signin().subscribe(function (res) {
            console.log("sign in access token: " + res.result);
            _this.navCtrl.setRoot('home');
        }, function (res) {
            _this.navCtrl.setRoot('signuppage');
        });
    };
    Start.prototype.goNextPage = function () {
        if (this.userService.isRegistered()) {
            this.navCtrl.setRoot('home');
        }
    };
    Start = __decorate([
        core_1.Component({
            templateUrl: 'start.html'
        })
    ], Start);
    return Start;
}());
exports.Start = Start;
