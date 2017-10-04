"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Einstruction = (function () {
    function Einstruction(emergencyService, navCtrl) {
        var _this = this;
        this.emergencyService = emergencyService;
        this.navCtrl = navCtrl;
        this.etimer = 123;
        // toDo: get patient info from server
        this.patient = {
            name: 'Micheal Lexon',
            info: 'Non Alergy'
        };
        var watchEmergency = this.emergencyService.selectedEmergencyOngoing.subscribe(function (res) {
            if (!res) {
                //emergency is not ongoing anymore
                watchEmergency.unsubscribe();
                alert("The emergency ended...");
                _this.emergencyService.cancelAssistEmergency(emergencyService.selectedEmergency.emergencyid).subscribe(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
                _this.navCtrl.setRoot('home');
            }
        });
    }
    Einstruction.prototype.endEmergency = function () {
        this.navCtrl.setRoot('EndScreen');
    };
    __decorate([
        core_1.Input()
    ], Einstruction.prototype, "etimer", void 0);
    Einstruction = __decorate([
        core_1.Component({
            selector: 'e-instruction',
            templateUrl: 'instruction.html'
        })
    ], Einstruction);
    return Einstruction;
}());
exports.Einstruction = Einstruction;
