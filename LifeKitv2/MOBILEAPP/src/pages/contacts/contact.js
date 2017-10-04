"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var ContactPage = (function () {
    function ContactPage(deviceService, navCtrl) {
        this.deviceService = deviceService;
        this.navCtrl = navCtrl;
        //need to loo through the emergency contacts list
    }
    ContactPage.prototype.showsContactInformation = function (contact) {
        //console.log(contact.phone);
        var temp = "";
        contact.phone.forEach(function (ele) {
            temp = temp + " " + ele.type + ": " + ele.value + "\n";
        });
        ionic_native_1.Dialogs.alert("Name: " + contact.name + "  Number: " + temp);
    };
    ContactPage = __decorate([
        core_1.Component({
            selector: 'page-contact',
            templateUrl: 'contact.html'
        })
    ], ContactPage);
    return ContactPage;
}());
exports.ContactPage = ContactPage;
