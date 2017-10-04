/**
 * Created by roy_f on 3/14/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var EmergencyService = (function () {
    function EmergencyService(apiService, http, jwtService) {
        this.apiService = apiService;
        this.http = http;
        this.jwtService = jwtService;
        this.selectedEmergency = null;
        this.selectedEmergencyOngoing = new ReplaySubject_1.ReplaySubject(1);
        this.selectedEmergencyUpdate = new ReplaySubject_1.ReplaySubject(1);
    }
    //Assistance
    EmergencyService.prototype.isAssisting = function () {
        if (this.selectedEmergency) {
            return (true);
        }
        else {
            return (false);
        }
    };
    EmergencyService.prototype.commentEmergency = function (emergencyId, comment) {
        var path = "/assist/comment?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('emergencyid', emergencyId);
        body.set('comment', comment);
        return (this.apiService.put(path, body).map(function (res) {
            return (res);
        }, function (error) {
            alert(error);
        }));
    };
    EmergencyService.prototype.assistEmergency = function (emergency, response) {
        var _this = this;
        var path = "/assist/create?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.append('emergencyid', emergency.emergencyid + "");
        body.append('response', response + "");
        return (this.apiService.post(path, body).map(function (res) {
            _this.selectedEmergencyOngoing.next(true);
            _this.selectedEmergency = emergency;
            return (res);
        }, function (error) {
            alert(error);
        }));
    };
    EmergencyService.prototype.cancelAssistEmergency = function (emergencyId) {
        var _this = this;
        var path = "/assist/create?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.append('emergencyid', emergencyId);
        body.append('response', 0 + "");
        return (this.apiService.post(path, body).map(function (res) {
            _this.selectedEmergency = null;
            return (res);
        }, function (error) {
            alert(error);
        }));
    };
    //untested khoi
    EmergencyService.prototype.getEmergencyStatus = function (emergencyId) {
        var path = "/emergency/status?accesstoken=" + this.jwtService.getAccessToken() + "&emergencyid=" + emergencyId;
        return (this.apiService.get(path).map(function (res) {
            var responderList = new Array();
            responderList = res.result;
            console.log(responderList);
            return (responderList);
        }, function (error) {
            alert(error);
        }));
    };
    EmergencyService.prototype.endEmergency = function () {
        var _this = this;
        if (this.hostingEmergencyId) {
            var path = "/emergency/end?accesstoken=" + this.jwtService.getAccessToken();
            var body = new http_1.URLSearchParams();
            body.set('emergencyid', this.hostingEmergencyId);
            return (this.apiService.put(path, body).map(function (res) {
                _this.hostingEmergencyId = null;
                //for now return res
                return (res);
            }, function (error) {
                alert(error);
            }));
        }
        else {
            return (new Rx_1.Observable(function (ob) {
                ob.next(false);
            }));
        }
    };
    EmergencyService.prototype.startEmergency = function (userName, address, geo) {
        var _this = this;
        var path = "/emergency/start?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('lat', geo.coords.latitude.valueOf() + "");
        body.set('lng', geo.coords.longitude.valueOf() + "");
        body.set('user_nickname', userName);
        body.set('address', JSON.stringify(address));
        return (this.apiService.post(path, body).map(function (res) {
            _this.hostingEmergencyId = res.result;
            return (res.result);
        }, function (error) {
            alert(error);
        }));
    };
    EmergencyService.prototype.startEmergency2 = function (userName, geo) {
        var _this = this;
        var path = "/emergency/start?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('lat', geo.coords.latitude.valueOf() + "");
        body.set('lng', geo.coords.longitude.valueOf() + "");
        body.set('user_nickname', userName);
        body.set('address', "");
        return (this.apiService.post(path, body).map(function (res) {
            _this.hostingEmergencyId = res.result;
            return (res.result);
        }, function (error) {
            alert(error);
        }));
    };
    EmergencyService.prototype.updateCarrierLocation = function (lat, lng) {
        var path = "/update/location?accesstoken=" + this.jwtService.getAccessToken();
        var body = new http_1.URLSearchParams();
        body.set('lat', lat.toString());
        body.set('lng', lng.toString());
        return this.apiService.post(path, body).map(function (res) {
            return (res);
        }, function (error) {
            alert(error);
        });
    };
    EmergencyService.prototype.reportOnDuty = function (lat, lng) {
        var _this = this;
        var path = "/emergency/onduty?accesstoken=" + this.jwtService.getAccessToken() + "&lat=" + lat + "&lng=" + lng;
        return this.apiService.get(path).map(function (res) {
            var emergencies = new Array();
            var array = res.result;
            array.forEach(function (res) {
                var temp;
                temp = res;
                try {
                    res.date = new Date(res.started_at);
                    temp.emergency_address = JSON.parse(res.emergency_address + "");
                }
                catch (e) {
                    temp.emergency_address = null;
                }
                emergencies.push(res);
            });
            if (_this.isAssisting()) {
                var isOngoing = false;
                var theUpdatedEmergency = null;
                emergencies.forEach(function (e) {
                    if (e.emergencyid == _this.selectedEmergency.emergencyid) {
                        //the emergency is still ongoing. otherwise it is not ongoing...
                        isOngoing = true;
                        theUpdatedEmergency = e;
                    }
                });
                if (!isOngoing) {
                    //notifies that it is no longer ongoing
                    _this.selectedEmergencyOngoing.next(false);
                }
                else {
                    //if it is ongoing, then update the locatoin to see if the preson got close to the perosn
                    if (theUpdatedEmergency) {
                        console.log(theUpdatedEmergency);
                        _this.selectedEmergencyUpdate.next(theUpdatedEmergency);
                    }
                }
            }
            return (emergencies);
        }, function (error) {
            alert(error);
        });
    };
    EmergencyService.prototype.awaitCloseToPatient = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            var unsubscriber = _this.selectedEmergencyUpdate.subscribe(function (e) {
                var DISTANCE_CLOSE = 20;
                if (e.distance <= DISTANCE_CLOSE) {
                    if (unsubscriber) {
                        unsubscriber.unsubscribe();
                    }
                    resolve();
                }
            }, function (error) {
                if (unsubscriber) {
                    unsubscriber.unsubscribe();
                }
                reject();
            });
        }));
    };
    EmergencyService.ACCEPT_EMERGENCY = 1;
    EmergencyService = __decorate([
        core_1.Injectable()
    ], EmergencyService);
    return EmergencyService;
}());
exports.EmergencyService = EmergencyService;
