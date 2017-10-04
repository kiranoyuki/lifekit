"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AddFromPhoneEmergencyContact = (function () {
    function AddFromPhoneEmergencyContact(deviceService) {
        var _this = this;
        this.deviceService = deviceService;
        deviceService.getAllPhoneContacts().then(function (list) {
            _this.contacts = list.sort(function (c1, c2) {
                var str1;
                var str2;
                if (!c1.displayName) {
                    str1 = null;
                }
                else {
                    str1 = c1.displayName.toUpperCase();
                }
                if (!c2.displayName) {
                    str2 = null;
                }
                else {
                    str2 = c2.displayName.toUpperCase();
                }
                if (str1 && !str2) {
                    return (1);
                }
                else if (str2 && !str1) {
                    return (-1);
                }
                else if (str1 > str2) {
                    return (1);
                }
                else if (str2 > str1) {
                    return (-1);
                }
                else {
                    return (0);
                }
            });
        });
    }
    AddFromPhoneEmergencyContact.prototype.addEmergencyContact = function (contact) {
        console.log(contact);
        alert('Adding emergency contact ' + contact.displayName);
        if (contact.phoneNumbers) {
            //It has phone numbers then add...
            this.deviceService.addEmergencyContact(contact);
        }
        else {
            alert('Contact has no phone numbers...');
        }
    };
    AddFromPhoneEmergencyContact = __decorate([
        core_1.Component({
            templateUrl: 'add-fromphone-emergency-contact.html'
        })
    ], AddFromPhoneEmergencyContact);
    return AddFromPhoneEmergencyContact;
}());
exports.AddFromPhoneEmergencyContact = AddFromPhoneEmergencyContact;
