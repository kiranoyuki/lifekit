"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var user_setting_model_1 = require("../../../shared/models/user-setting.model");
var SettingsEditAddr = (function () {
    function SettingsEditAddr(param, viewCtrl) {
        this.param = param;
        this.viewCtrl = viewCtrl;
        this.address = new user_setting_model_1.Address();
    }
    SettingsEditAddr.prototype.addThenDismiss = function () {
        this.viewCtrl.dismiss(this.address);
    };
    SettingsEditAddr.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SettingsEditAddr = __decorate([
        core_1.Component({
            templateUrl: 'setting-editaddr.html'
        })
    ], SettingsEditAddr);
    return SettingsEditAddr;
}());
exports.SettingsEditAddr = SettingsEditAddr;
