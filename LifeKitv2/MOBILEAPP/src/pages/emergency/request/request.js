"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var emergencyUserProc_1 = require("../../../shared/services/emergencyUserProc/emergencyUserProc");
var EmergencyRequest = (function () {
    function EmergencyRequest(navParam, userSettingService, emergencyService, geolocation, googlePlaces, deviceService, er, userSettingsService, navCtrl, app) {
        this.navParam = navParam;
        this.googlePlaces = googlePlaces;
        this.deviceService = deviceService;
        this.er = er;
        this.userSettingsService = userSettingsService;
        this.navCtrl = navCtrl;
        this.app = app;
        this.emergencyUserProc = new emergencyUserProc_1.EmergencyUserProc(deviceService, userSettingService, emergencyService);
        this.emergencyUserProc.startEmergencyProc();
        app.viewWillLeave.subscribe(function (res) {
            //this.cancelRequest();
        });
    }
    EmergencyRequest.prototype.cancelRequest = function () {
        var _this = this;
        this.emergencyUserProc.stopEmergencyProc().subscribe(function (res) {
            var deviceTriggeredEmergency = _this.navParam.get('deviceTriggeredEmergency');
            if (deviceTriggeredEmergency) {
                _this.navCtrl.setRoot('home').then(function (res) {
                    deviceTriggeredEmergency = false;
                });
            }
            else {
                _this.navCtrl.setRoot('home');
            }
        });
    };
    __decorate([
        core_1.ViewChild('mapCanvas')
    ], EmergencyRequest.prototype, "mapElement", void 0);
    EmergencyRequest = __decorate([
        core_1.Component({
            templateUrl: 'request.html'
        })
    ], EmergencyRequest);
    return EmergencyRequest;
}());
exports.EmergencyRequest = EmergencyRequest;
