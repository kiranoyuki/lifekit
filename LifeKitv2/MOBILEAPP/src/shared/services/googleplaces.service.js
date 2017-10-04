"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require("../../environment/environment");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
/**
 * Created by roy_f on 3/16/2017.
 */
var GooglePlaces = (function () {
    function GooglePlaces(apiService) {
        this.apiService = apiService;
    }
    GooglePlaces.prototype.getGooglePlaces = function (aPlace, userLocation, radius, numResults) {
        var _this = this;
        var example = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDJ2gtLk2bgMvCwqBDWHJGilstJuKE87-Y";
        var url = "https://maps.googleapis.com/maps/api/place/radarsearch/json";
        var searchParams = new http_1.URLSearchParams();
        searchParams.append('opennow', "true");
        searchParams.append('rankby', 'distance');
        searchParams.append('radius', radius + "");
        searchParams.append('keyword', aPlace);
        searchParams.append("type", aPlace);
        searchParams.append("location", userLocation.coords.latitude + "," + userLocation.coords.longitude);
        searchParams.append("key", environment_1.environment.maps_api_key);
        var getGoogleDetailed = this.getGoogleDetailed;
        var abs_get = this.apiService.abs_get;
        var ob = new rxjs_1.Observable(function (observer) {
            _this.apiService.abs_get(url, searchParams, false).subscribe(function (res) {
                var places = [];
                var array = res.results;
                var i = 0;
                _this.getGoogleDetailedHelper(i, places, array, numResults, observer);
            }, function (error) { console.log(error); });
        });
        return (ob);
    };
    GooglePlaces.prototype.getGoogleDetailedHelper = function (i, places, array, numResults, observer) {
        var _this = this;
        this.getGoogleDetailed(array[i].place_id + "").subscribe(function (res) {
            places.push(res);
            if (places.length == numResults) {
                observer.next(places);
            }
            else {
                i++;
                _this.getGoogleDetailedHelper(i, places, array, numResults, observer);
            }
        });
    };
    GooglePlaces.prototype.getGoogleDetailed = function (placeId) {
        var url = 'https://maps.googleapis.com/maps/api/place/details/json';
        var searchParams = new http_1.URLSearchParams();
        searchParams.append('placeid', placeId);
        searchParams.append('key', environment_1.environment.maps_api_key);
        return (this.apiService.abs_get(url, searchParams, false).map(function (res) {
            return (res.result);
        }));
    };
    GooglePlaces.HTTP_REQUEST = environment_1.environment.maps_api_url;
    GooglePlaces.API_KEY = environment_1.environment.maps_api_key;
    GooglePlaces = __decorate([
        core_1.Injectable()
    ], GooglePlaces);
    return GooglePlaces;
}());
exports.GooglePlaces = GooglePlaces;
