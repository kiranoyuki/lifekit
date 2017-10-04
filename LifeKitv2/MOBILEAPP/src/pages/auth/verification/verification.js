"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var VerificationPage = (function () {
    function VerificationPage(userService, alerCtrl, navCtrl) {
        this.userService = userService;
        this.alerCtrl = alerCtrl;
        this.navCtrl = navCtrl;
        this.login = {};
        this.submitted = false;
        this.modelOk = false;
    }
    VerificationPage.prototype.onLogin = function (form) {
        this.submitted = true;
        if (form.valid) {
        }
    };
    VerificationPage.prototype.clickSendVeriCode = function (veriCode) {
        //Do that post and get thing and then epending on the promised response then do the following
        //for now we are just going to go to the next page on a success....
        //GET BAKC IF THE PERSON IS A NALOXONE CARRIER OR A PATIENT then figure out which to set as root.
        var _this = this;
        //After post, we should get an refresh token so just save it in the computer manually for now
        //alert('verification code entered:' + veriCode);
        this.userService.validate(veriCode).subscribe(function (res) {
            //alert("Refresh Token: " + res);
            _this.userService.signin().subscribe(function (res) {
                _this.navCtrl.setRoot('home');
            });
        });
    };
    VerificationPage = __decorate([
        core_1.Component({
            templateUrl: 'verification.html'
        })
    ], VerificationPage);
    return VerificationPage;
}());
exports.VerificationPage = VerificationPage;
