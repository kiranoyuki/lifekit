"use strict";
var flashlightProc_1 = require("./flashlightProc");
var vibrateProc_1 = require("./vibrateProc");
var beepingProc_1 = require("./beepingProc");
var countDownProc_1 = require("./countDownProc");
var smsAllEmergenecyContactsProc_1 = require("./smsAllEmergenecyContactsProc");
var ionic_native_1 = require("ionic-native");
var EmergencyUserProc = (function () {
    function EmergencyUserProc(deviceService, userSettingService, emergencyService) {
        this.deviceService = deviceService;
        this.userSettingService = userSettingService;
        this.emergencyService = emergencyService;
        this.flashLightProc = new flashlightProc_1.FlashLightProc();
        this.vibrateProc = new vibrateProc_1.VibrateProc();
        this.beepingProc = new beepingProc_1.BeepingProc();
        this.countDownProc = new countDownProc_1.CountDownProc();
        this.smsAllEmergencyContactsProc = new smsAllEmergenecyContactsProc_1.SMSAllEmergencyContactsProc(this.userSettingService, this.deviceService);
        this.emergencyOngoing = false;
        this.userSettings = userSettingService.loadUserSettings();
    }
    EmergencyUserProc.prototype.startEmergencyProc = function () {
        var _this = this;
        //this.flashLightProc.startFlashing();
        this.vibrateProc.startVibrate();
        this.beepingProc.startBeepingProc();
        this.countDownProc.startTimerTillEnd().then(function () {
            console.log('count down reached!');
            ionic_native_1.Geolocation.getCurrentPosition().then(function (geo) {
                _this.startEmergencyWithServer(geo).subscribe(function (res) {
                    console.log('geolocation found preparing to notify server and contacts...');
                    console.log(res);
                }, function (error) {
                    console.log("Error!");
                    console.log(error);
                });
                _this.smsAllEmergencyContactsProc.contactAllStartEmergency(geo);
            });
        });
    };
    EmergencyUserProc.prototype.stopEmergencyProc = function () {
        try {
            this.countDownProc.stopTimerBeforeEnd();
        }
        catch (e) {
            console.log(e);
        }
        //this.flashLightProc.stopFlashing();
        this.vibrateProc.stopVibrate();
        this.beepingProc.stopBeepingProc();
        if (this.smsAllEmergencyContactsProc.isContacted) {
            this.smsAllEmergencyContactsProc.contactAllCancelEmergency();
        }
        return (this.endEmergencyWithServer());
    };
    EmergencyUserProc.prototype.endEmergencyWithServer = function () {
        return (this.emergencyService.endEmergency());
    };
    EmergencyUserProc.prototype.startEmergencyWithServer = function (geolocation) {
        var address = null;
        var firstName = "no name";
        if (this.userSettings && this.userSettings.firstName) {
            firstName = this.userSettings.firstName;
        }
        if (this.userSettings && this.userSettings.addresses && this.userSettings.addresses[0]) {
            address = this.userSettings.addresses[0];
            return (this.emergencyService.startEmergency(firstName, address, geolocation));
        }
        else {
            return (this.emergencyService.startEmergency2(firstName, geolocation));
        }
    };
    return EmergencyUserProc;
}());
exports.EmergencyUserProc = EmergencyUserProc;
