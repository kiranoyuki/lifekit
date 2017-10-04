"use strict";
var UserSettings = (function () {
    function UserSettings() {
        this.addresses = new Array();
    }
    return UserSettings;
}());
exports.UserSettings = UserSettings;
var Address = (function () {
    function Address() {
    }
    Address.prototype.toString = function () {
        return (this.houseNumber + " " + this.street + " " + this.city + " " + this.state + " " + this.zipCode);
    };
    return Address;
}());
exports.Address = Address;
