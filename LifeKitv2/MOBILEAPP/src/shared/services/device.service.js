"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var models_1 = require("../models");
var ionic_native_2 = require("ionic-native");
var Rx_1 = require('rxjs/Rx');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var DeviceService = (function () {
    function DeviceService(http, apiService, storage) {
        var _this = this;
        this.http = http;
        this.apiService = apiService;
        this.storage = storage;
        this.emergencyContacts = new Array();
        this.allContacts = [];
        this.devices = [];
        this.carriers = [];
        // if there is emergency contact before, use it.
        this.storage.get("emergency_contacts").then(function (res) {
            if (res != null)
                _this.emergencyContacts = res;
            else
                _this.updateContactStorage();
        });
    }
    DeviceService.prototype.getAllPhoneContacts = function () {
        var fields = ['displayName', 'phoneNumbers'];
        var options = new ionic_native_1.ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        return (ionic_native_1.Contacts.find(fields, options));
    };
    DeviceService.prototype.getNaxloneCarriers = function () {
        // first refresh carrier cache from google then return.
        return this.carriers;
    };
    DeviceService.prototype.getEmergencyContacts = function () {
        return this.emergencyContacts;
    };
    DeviceService.prototype.updateContactStorage = function () {
        this.storage.set("emergency_contacts", this.emergencyContacts);
    };
    //use when deleting an emergency contact from the page
    DeviceService.prototype.removeEmergencyContact = function (contact) {
        this.emergencyContacts.splice(this.emergencyContacts.indexOf(contact), 1);
        this.updateContactStorage();
    };
    //use when adding emergency contact from the phone list
    DeviceService.prototype.addEmergencyContact = function (contact) {
        var emerg = models_1.EmergencyContact.fromContact(contact);
        this.emergencyContacts.push(emerg);
        this.updateContactStorage();
        return;
    };
    //use when creating then adding the emergency contact
    DeviceService.prototype.createEmergencyContact = function (lastName, firstName, phone) {
        var contact = ionic_native_1.Contacts.create();
        contact.name = new ionic_native_1.ContactName(null, lastName, firstName);
        contact.displayName = firstName + " " + lastName;
        contact.phoneNumbers = [new ionic_native_1.ContactField("phone", phone)];
        return this.addEmergencyContact(contact);
    };
    // geolocation and maps
    DeviceService.prototype.getCurrentPosition = function () {
        var _this = this;
        if (this.currentLocation) {
            return Rx_1.Observable.of(this.currentLocation);
        }
        else {
            // issue an update request on the update
            var marker = new ReplaySubject_1.ReplaySubject(1);
            ionic_native_2.Geolocation.getCurrentPosition().then(function (resp) {
                var pos = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                    name: "Your location"
                };
                marker.next(pos);
                _this.currentLocation = pos;
            });
            return marker.asObservable();
        }
    };
    DeviceService.prototype.processGooglePlaces = function (data) {
        console.log(data);
        var accum = [];
        data.result.forEach(function (p) {
            accum.push({
                lat: p.geometry.location.lat,
                lng: p.geometry.location.lng,
                name: p.name
            });
        });
        return accum;
    };
    DeviceService.prototype.load = function () {
        if (this.data) {
            return Rx_1.Observable.of(this.data);
        }
        else {
            return this.http.get('assets/data/map-data.json')
                .map(this.processData);
        }
    };
    // this function is not "owned" by this class, but by the load function above.
    DeviceService.prototype.processData = function (data) {
        this.data = data.json();
        // do any further preprocessing here, don't forget this function is not owned by this class.
        return this.data;
    };
    DeviceService = __decorate([
        core_1.Injectable()
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
