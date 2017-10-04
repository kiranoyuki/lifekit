"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by roy_f on 4/26/2017.
 */
var core_1 = require("@angular/core");
var Test_1 = require("../../shared/components/TestComponent/Test");
var ionic_native_1 = require("ionic-native");
var frequency_device_filter_1 = require("../../shared/services/frequency-device-filter");
var TestScreen = (function () {
    function TestScreen(googlePlacesService, geo) {
        this.googlePlacesService = googlePlacesService;
        this.geo = geo;
        this.testTestSuite = new Test_1.TestSuite("Test The Test Suite");
        this.testGooglePlacesService = new Test_1.TestSuite('Test Google Places Service');
        this.testBluetoothService = new Test_1.TestSuite('Test Bluetooth Service');
        this.testFrequencyDeviceFilter = new Test_1.TestSuite('Test Frequency Device Filter');
        //Add the test you want here with the template for how to make a test in the test class
        this.testTestSuite.addTest("The Test Class To Default Succeed", new Promise(function (resolve, reject) {
            resolve();
        }));
        this.testTestSuite.addTest("The Test Class To Default Fail", new Promise(function (resolve, reject) {
            reject();
        }));
        this.testTestSuite.runAllTest();
        this.testGooglePlacesService.addTest('getGoogleDetailed http request', new Promise(function (resolve, reject) {
            googlePlacesService.getGoogleDetailed("EisxMyBNYXJrZXQgU3RyZWV0LCBXaWxtaW5ndG9uLCBOQyAyODQwMSwgVVNB").subscribe(function (res) {
                if (res) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }));
        this.testGooglePlacesService.addTest('getGoogleDetailed return correct json', new Promise(function (resolve, reject) {
            googlePlacesService.getGoogleDetailed("EisxMyBNYXJrZXQgU3RyZWV0LCBXaWxtaW5ndG9uLCBOQyAyODQwMSwgVVNB").subscribe(function (res) {
                var temp = res;
                if (temp.name) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }));
        this.testGooglePlacesService.addTest('getGooglePlaces http request', new Promise(function (resolve, reject) {
            ionic_native_1.Geolocation.getCurrentPosition().then(function (res) {
                googlePlacesService.getGooglePlaces('pharmacy', res, 5000, 5).subscribe(function (res) {
                    if (res) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            });
        }));
        this.testGooglePlacesService.addTest('getGooglePlaces correct return json', new Promise(function (resolve, reject) {
            ionic_native_1.Geolocation.getCurrentPosition().then(function (res) {
                googlePlacesService.getGooglePlaces('pharmacy', res, 5000, 5).subscribe(function (res) {
                    var temp = res;
                    temp.forEach(function (item) {
                        console.log(item);
                        if (!(item.name)) {
                            reject();
                        }
                    });
                    resolve();
                });
            });
        }));
        this.testGooglePlacesService.runAllTest();
        this.testBluetoothService.addTest('Bluetooth availability on device', new Promise(function (resolve, reject) {
            ionic_native_1.BluetoothSerial.enable().then(function (res) {
                if (ionic_native_1.BluetoothSerial.isEnabled()) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }));
        this.testBluetoothService.runAllTest();
        this.testFrequencyDeviceFilter.addTest('shouldProcess On respir pulse gives true to process data', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            if (fd.shouldProcess({ respirPulse: 1 })) {
                resolve();
            }
            else {
                reject();
            }
        }));
        this.testFrequencyDeviceFilter.addTest('shouldProcess Processes anyway if obtained 5 readings', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                resolve();
            }
            else {
                reject();
            }
        }));
        this.testFrequencyDeviceFilter.addTest('shouldProcess On no respir pulse and not obtained 5 readings, does not process', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            var i = 0;
            for (i; i < 5; i++) {
                //sends no pulse however on the 5th one sends a pulse
                if (fd.shouldProcess({ respirPulse: 0 })) {
                    reject();
                }
            }
            resolve();
        }));
        this.testFrequencyDeviceFilter.addTest('shouldProcess Processes if obtained no pulse but then obtain pulse', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 1 })) {
                resolve();
            }
            else {
                reject();
            }
        }));
        this.testFrequencyDeviceFilter.addTest('shouldProcess Processes if counter reaches x number of readings', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                resolve();
            }
            reject();
        }));
        this.testFrequencyDeviceFilter.addTest('shouldProcess if it resets the counter and processes on the x numbered reading again', new Promise(function (resolve, reject) {
            var fd = new frequency_device_filter_1.FrequencyDeviceFilter(5);
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                reject();
            }
            if (fd.shouldProcess({ respirPulse: 0 })) {
                resolve();
            }
            reject();
        }));
        this.testFrequencyDeviceFilter.runAllTest();
    }
    TestScreen = __decorate([
        core_1.Component({
            templateUrl: 'TestScreen.html'
        })
    ], TestScreen);
    return TestScreen;
}());
exports.TestScreen = TestScreen;
