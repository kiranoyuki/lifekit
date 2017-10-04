"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var emergency_service_1 = require("../../shared/services/emergency.service");
var rxjs_1 = require("rxjs");
var Carriers = (function () {
    function Carriers(em, jwtService, emergencyService, navCtrl) {
        this.em = em;
        this.jwtService = jwtService;
        this.emergencyService = emergencyService;
        this.navCtrl = navCtrl;
        this.emergencies = new Array();
        this.onDutyToggledObserver = new rxjs_1.ReplaySubject(1);
        this.unsubSendLocation = new Array();
        this.unsubPageReport = new Array();
        this.lastNumberEmergrencies = 0;
        this.carrierSetting = {
            onDuty: true,
            hasNaloxone: true
        };
    }
    Carriers.prototype.acceptTask = function (emergency) {
        var _this = this;
        this.em.assistEmergency(emergency, emergency_service_1.EmergencyService.ACCEPT_EMERGENCY).subscribe(function (res) {
            //the emegrency has been accepted
            ionic_native_1.Dialogs.alert("Emergency Accepted!");
            _this.navCtrl.push('elocator', {
                Emergency: emergency
            });
        });
    };
    Carriers.prototype.sendLocation = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (resp) {
            console.log("reporting location");
            _this.emergencyService.updateCarrierLocation(resp.coords.latitude, resp.coords.longitude).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    Carriers.prototype.pageReportOnDuty = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (resp) {
            console.log('reporting for duty');
            _this.emergencyService.reportOnDuty(resp.coords.latitude, resp.coords.longitude).subscribe(function (res) {
                res.forEach(function (e) {
                    var isExist = false;
                    _this.emergencies.forEach(function (ePrime) {
                        if (ePrime.emergencyid == e.emergencyid) {
                            isExist = true;
                        }
                    });
                    if (isExist) {
                    }
                    else {
                        //send SMS to notify there is a new emergency
                        ionic_native_1.SMS.send(_this.jwtService.getTelephoneNumber(), "LifeKit Alert!- Emergency Patient Needs Help!");
                    }
                });
                _this.emergencies = res;
                //check if there are new emergencys, if there are, then send a notification to the phone
            });
        });
    };
    Carriers.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.onDutyToggled) {
            //run run code for carrier actions
            if (this.unsubSendLocation.length == 0) {
                console.log('subscribing...');
                this.sendLocationOb = rxjs_1.Observable.timer(0, Carriers.sendingLocationInterval);
                this.unsubSendLocation.push(this.sendLocationOb.subscribe(function (t) {
                    _this.sendLocation();
                }));
            }
            if (this.unsubPageReport.length == 0) {
                console.log('subscribing...');
                this.pageReportDutyOb = rxjs_1.Observable.timer(0, Carriers.ondutyInterval);
                this.unsubPageReport.push(this.pageReportDutyOb.subscribe(function (t) {
                    _this.pageReportOnDuty();
                }));
            }
        }
        else {
            //run stop code for any carrier actions
            if (this.unsubSendLocation.length > 0) {
                console.log('unsubscribe from sending location');
                this.unsubSendLocation.forEach(function (res) {
                    res.unsubscribe();
                });
                this.unsubSendLocation = new Array();
            }
            if (this.unsubPageReport.length > 0) {
                console.log('unsubscribe from duty');
                this.unsubPageReport.forEach(function (res) {
                    res.unsubscribe();
                });
                this.unsubPageReport = new Array();
            }
        }
    };
    Carriers.prototype.open = function (url) {
        this.navCtrl.push(url);
    };
    Carriers.sendingLocationInterval = 7000;
    Carriers.ondutyInterval = 5000;
    __decorate([
        core_1.Input()
    ], Carriers.prototype, "emergencies", void 0);
    __decorate([
        core_1.Input()
    ], Carriers.prototype, "onDutyToggled", void 0);
    Carriers = __decorate([
        core_1.Component({
            selector: 'carrier',
            templateUrl: 'carriers.html'
        })
    ], Carriers);
    return Carriers;
}());
exports.Carriers = Carriers;
