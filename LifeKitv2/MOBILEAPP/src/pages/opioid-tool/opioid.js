"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var OpioidTool = (function () {
    function OpioidTool() {
        this.about = "tool-about";
        this.about = "tool-about";
    }
    OpioidTool.prototype.submit = function () {
        if (!(this.gender && this.age)) {
            alert("Please enter your gender and describe your age.");
            return;
        }
        if (isNaN(this.age))
            this.sum = 0;
        else
            this.sum = Math.floor(this.pain / 3);
        if (this.gender == 'm') {
            if (this.fAlcohol)
                this.sum += 3;
            if (this.fIDrugs)
                this.sum += 3;
        }
        else if (this.gender == 'f') {
            if (this.fAlcohol)
                this.sum += 1;
            if (this.fIDrugs)
                this.sum += 2;
            if (this.pSex)
                this.sum += 3;
        }
        if (this.age == 'yes')
            this.sum += 1;
        if (this.fPDrugs)
            this.sum += 4;
        if (this.pAlcohol)
            this.sum += 3;
        if (this.pIDrugs)
            this.sum += 4;
        if (this.pPDrugs)
            this.sum += 5;
        if (this.pDisease)
            this.sum += 2;
        if (this.pSad)
            this.sum += 1;
        if (this.sum >= 8)
            alert("You are at a severe risk of an overdose. Please contact your doctor and only take your medication as specified.");
        else if (this.sum == 7)
            alert("You are at a moderate risk of an overdose.  Please proceed with caution.");
        else
            alert("You are at a mild risk of an overdose. Please proceed with caution.");
    };
    OpioidTool = __decorate([
        core_1.Component({
            selector: 'page-opioid-tool',
            templateUrl: 'opioid.html'
        })
    ], OpioidTool);
    return OpioidTool;
}());
exports.OpioidTool = OpioidTool;
