"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SignUpPage = (function () {
    function SignUpPage(userService, alerCtrl, navCtrl) {
        this.userService = userService;
        this.alerCtrl = alerCtrl;
        this.navCtrl = navCtrl;
        this.login = {};
        this.submitted = false;
        this.modelOk = false;
    }
    SignUpPage.prototype.onLogin = function (form) {
        this.submitted = true;
        if (form.valid) {
        }
    };
    SignUpPage.prototype.activateButton = function () {
        this.modelOk = (this.login.username && this.login.password) ? true : false;
        ;
    };
    SignUpPage.prototype.sendVerif = function () {
        var _this = this;
        var alert = this.alerCtrl.create({
            title: 'Phone Number Accepted!',
            message: "Please enter the verification code sent to " + this.phoneNumber + " to continue.",
            buttons: [{
                    text: 'Ok',
                    handler: function () { return _this.requestVerify(_this.phoneNumber); }
                }]
        });
        alert.present();
    };
    SignUpPage.prototype.requestVerify = function (phone) {
        var _this = this;
        this.userService.signup(phone).subscribe(function (res) {
            //console.log("verification code", res);
            //NEXT PAGE HERE AFTER COR FIXED
            console.log(res);
            alert("Your verification code: " + res.result);
            _this.nextPage();
        }, 
        // if you wish to intercept the error
        function (error) {
            console.log("something went wrong: ", error);
        });
    };
    SignUpPage.prototype.nextPage = function () {
        this.navCtrl.push('verificationpage');
    };
    SignUpPage = __decorate([
        core_1.Component({
            templateUrl: 'signup.html'
        })
    ], SignUpPage);
    return SignUpPage;
}());
exports.SignUpPage = SignUpPage;
