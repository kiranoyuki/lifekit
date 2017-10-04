"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require('ionic-angular');
var TypeUser = (function () {
    function TypeUser(ref, emergencyService, geo) {
        this.ref = ref;
        this.emergencyService = emergencyService;
        this.geo = geo;
        this.onDutyToggled = false;
    }
    TypeUser.prototype.notifyOnDuty = function () {
        this.ref.detectChanges();
        console.log(this.onDutyToggled);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Segment)
    ], TypeUser.prototype, "segment", void 0);
    TypeUser = __decorate([
        core_1.Component({
            templateUrl: 'typeuser.html'
        })
    ], TypeUser);
    return TypeUser;
}());
exports.TypeUser = TypeUser;
