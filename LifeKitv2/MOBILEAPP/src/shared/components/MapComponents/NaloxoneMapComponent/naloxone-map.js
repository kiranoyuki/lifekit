"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var google_maps_1 = require('@ionic-native/google-maps');
var NaloxoneMap = (function () {
    function NaloxoneMap(googlePlaces, geo, googleMaps) {
        this.googlePlaces = googlePlaces;
        this.geo = geo;
        this.googleMaps = googleMaps;
    }
    NaloxoneMap.prototype.ngAfterViewInit = function () {
        this.loadMap();
    };
    NaloxoneMap.prototype.loadMap = function () {
        // make sure to create following structure in your view.html file
        // and add a height (for example 100%) to it, else the map won't be visible
        // <ion-content>
        //  <div #map id="map" style="height:100%;"></div>
        // </ion-content>
        var _this = this;
        // create a new map by passing HTMLElement
        var element = document.getElementById('map');
        var map = this.googleMaps.create(element);
        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        map.one(google_maps_1.GoogleMapsEvent.MAP_READY).then(function () {
            map.setMyLocationEnabled(true);
            ionic_native_1.Geolocation.getCurrentPosition().then(function (res) {
                // create LatLng object
                var currentLocation = new google_maps_1.LatLng(res.coords.latitude, res.coords.longitude);
                // create CameraPosition
                var position = {
                    target: currentLocation,
                    zoom: 18
                };
                // move the map's camera to position
                map.moveCamera(position);
                _this.googlePlaces.getGooglePlaces('pharmacy', res, 15000, 15).subscribe(function (places) {
                    console.log(places);
                    places.forEach(function (p) {
                        var coord = new google_maps_1.LatLng(p.geometry.location.lat, p.geometry.location.lng);
                        var markerOptions = {
                            position: coord
                        };
                        map.addMarker(markerOptions);
                    });
                });
            });
        });
    };
    NaloxoneMap = __decorate([
        core_1.Component({
            templateUrl: 'naloxone-map.html',
            selector: 'Naloxone-Map'
        })
    ], NaloxoneMap);
    return NaloxoneMap;
}());
exports.NaloxoneMap = NaloxoneMap;
