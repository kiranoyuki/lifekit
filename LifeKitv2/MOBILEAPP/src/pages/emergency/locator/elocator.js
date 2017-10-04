"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require('ionic-native');
var rxjs_1 = require("rxjs");
var endscreen_1 = require("../endscreen/endscreen");
var instruction_1 = require("../instruction/instruction");
var Elocator = (function () {
    function Elocator(emergencyService, modal, params, googlePlaces, navCtrl, alertCtrl) {
        var _this = this;
        this.emergencyService = emergencyService;
        this.modal = modal;
        this.params = params;
        this.googlePlaces = googlePlaces;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.timer = rxjs_1.Observable.timer(0, 1000);
        this.currentTime = Elocator.TIME_LIMIT;
        this.locators = new Array();
        this.patient = {
            name: 'Micheal Lex',
            address: '1011 Chestnut, Unit 1, PA',
            phone: '+1 215-232-5435'
        };
        this.emergency = params.get('Emergency');
        emergencyService.awaitCloseToPatient().then(function (res) {
            //you are now close to the patient NOW WHAT NIGGAR
            console.log("You are close....");
            _this.stageClosedToPatient();
        });
        var watchEmergency = this.emergencyService.selectedEmergencyOngoing.subscribe(function (res) {
            if (!res) {
                //emergency is not ongoing anymore
                watchEmergency.unsubscribe();
                alert("The emergency ended...");
                _this.emergencyService.cancelAssistEmergency(_this.emergency.emergencyid).subscribe(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
                _this.navCtrl.popToRoot();
            }
        });
        ionic_native_1.Geolocation.getCurrentPosition(Elocator.GPS_OPTIONS).then(function (res) {
            var geoposition = res;
            //Get positions for the map
            googlePlaces.getGooglePlaces('pharmacy', geoposition, 1500, 3).subscribe(function (res) {
                console.log(res);
                _this.locators = res;
            });
        }).catch(function (res) {
            console.log('error getting location');
        });
    }
    Elocator.prototype.ngOnInit = function () {
        var _this = this;
        //start the timer count
        console.log('ngoninit ran');
        this.timerOb = this.timer.subscribe(function (t) {
            _this.currentTime = _this.currentTime - 1;
            if (_this.currentTime == 0) {
                //stop the subscription and then.... start the next page with the alert.
                _this.timerOb.unsubscribe();
            }
        });
    };
    Elocator.prototype.call = function (phoneNumber) {
        phoneNumber = encodeURIComponent(phoneNumber);
        window.location.assign("tel:" + phoneNumber);
    };
    Elocator.prototype.openMap = function (address) {
        ionic_native_1.LaunchNavigator.isAppAvailable(ionic_native_1.LaunchNavigator.APP.GOOGLE_MAPS).then(function (isAvailable) {
            var app;
            if (isAvailable) {
                app = ionic_native_1.LaunchNavigator.APP.GOOGLE_MAPS;
            }
            else {
                console.warn("Google Maps not available - falling back to user selection");
                app = ionic_native_1.LaunchNavigator.APP.USER_SELECT;
            }
            ionic_native_1.Geolocation.getCurrentPosition(Elocator.GPS_OPTIONS).then(function (res) {
                var geoposition = res;
                var options = {
                    start: geoposition.coords.latitude + "," + geoposition.coords.longitude,
                    app: app
                };
                ionic_native_1.LaunchNavigator.navigate(address, options).then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
            });
        });
    };
    Elocator.prototype.cancelHelp = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancel Help Request',
            message: "Are you sure you want to cancel the patient request for help?",
            buttons: [{
                    text: 'Confirm',
                    handler: function () {
                        console.log("About to cancel emergency");
                        _this.emergencyService.cancelAssistEmergency(_this.emergency.emergencyid).subscribe(function (res) {
                            console.log(res);
                        }, function (error) {
                            console.log(error);
                        });
                        _this.navCtrl.popToRoot();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                }]
        });
        alert.present();
    };
    Elocator.prototype.saved = function () {
        var _this = this;
        var modal = this.modal.create(endscreen_1.EndScreen, {
            emergencyId: this.emergency.emergencyid
        });
        modal.dismiss(function (res) {
        }).then(function () {
            _this.navCtrl.setRoot('home');
        });
        modal.present();
    };
    Elocator.prototype.stageClosedToPatient = function () {
        var modal = this.modal.create(instruction_1.Einstruction, {});
        modal.present();
    };
    // toDO: implement method to get patient and naloxone locators
    //Time limit in seconds
    Elocator.TIME_LIMIT = 123;
    // toDO: get timer from server?
    Elocator.GPS_OPTIONS = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };
    Elocator = __decorate([
        core_1.Component({
            selector: 'e-locator',
            templateUrl: 'elocator.html'
        })
    ], Elocator);
    return Elocator;
}());
exports.Elocator = Elocator;
