"use strict";
var ionic_native_1 = require("ionic-native");
var EmergencyContact = (function () {
    function EmergencyContact() {
        this.phone = [];
    }
    EmergencyContact.fromContact = function (contact) {
        var emergencyContact = new EmergencyContact();
        emergencyContact.name = contact.displayName;
        if (contact.phoneNumbers) {
            contact.phoneNumbers.forEach(function (iContact) {
                if (iContact.value && iContact.value.length > 0) {
                    console.log(iContact.value);
                    var temp = new ionic_native_1.ContactField(iContact.type, iContact.value);
                    emergencyContact.phone.push(temp);
                }
            });
        }
        return emergencyContact;
    };
    return EmergencyContact;
}());
exports.EmergencyContact = EmergencyContact;
