"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var user_setting_model_1 = require("../../shared/models/user-setting.model");
var setting_editaddr_1 = require("./setting-editaddr/setting-editaddr");
var Settings = (function () {
    function Settings(modalCtrl, ref, userSettingsService, navCtrl) {
        this.modalCtrl = modalCtrl;
        this.ref = ref;
        this.userSettingsService = userSettingsService;
        this.navCtrl = navCtrl;
        this.userSettings = new user_setting_model_1.UserSettings();
    }
    Settings.prototype.ngOnInit = function () {
        var loaded = this.userSettingsService.loadUserSettings();
        if (loaded) {
            console.log(loaded);
            this.userSettings = loaded;
        }
        else {
            console.log(loaded);
        }
    };
    Settings.prototype.ionViewWillUnload = function () {
        console.log('unloading view.... saving content.');
        this.userSettingsService.saveUserSettings(this.userSettings);
    };
    Settings.prototype.presentAddAddressModal = function () {
        var _this = this;
        var add = this.modalCtrl.create(setting_editaddr_1.SettingsEditAddr, this.userSettings);
        add.onDidDismiss(function (res) {
            if (res) {
                _this.userSettings.addresses.push(res);
            }
        });
        add.present();
    };
    Settings.prototype.remove = function (index) {
        this.userSettings.addresses.splice(index, 1);
    };
    Settings = __decorate([
        core_1.Component({
            templateUrl: 'settings.html'
        })
    ], Settings);
    return Settings;
}());
exports.Settings = Settings;
