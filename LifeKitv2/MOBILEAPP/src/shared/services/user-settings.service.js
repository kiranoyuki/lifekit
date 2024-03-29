"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
/**
 * Created by roy_f on 3/16/2017.
 */
var UserSettingsService = (function () {
    function UserSettingsService() {
    }
    UserSettingsService.prototype.saveUserSettings = function (userSettings) {
        console.log('saved:' + userSettings);
        window.localStorage.removeItem('userSettings');
        window.localStorage.setItem('userSettings', JSON.stringify(userSettings));
    };
    UserSettingsService.prototype.loadUserSettings = function () {
        var temp = JSON.parse(window.localStorage.getItem('userSettings'));
        console.log('loaded: ' + temp);
        return (temp);
    };
    UserSettingsService = __decorate([
        core_1.Injectable()
    ], UserSettingsService);
    return UserSettingsService;
}());
exports.UserSettingsService = UserSettingsService;
