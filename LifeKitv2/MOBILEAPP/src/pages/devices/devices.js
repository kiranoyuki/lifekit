"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var bluetooth_service_1 = require("../../shared/services/bluetooth.service");
var Devices = (function () {
    function Devices(app, platform, ref) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.ref = ref;
        app.viewDidLoad.subscribe(function (res) {
        });
        if (this.platform.is('android')) {
            //alert("I am android!")
            //Call get list of connectable devices
            bluetooth_service_1.BluetoothService.discoveredBluetoothDevices.subscribe(function (list) {
                _this.discoveredBluetoothDevices = list;
                //this.ref.detectChanges();
            });
            bluetooth_service_1.BluetoothService.connectedDevice.subscribe(function (device) {
                _this.connectedDevice = device;
                //this.ref.detectChanges();
            });
            bluetooth_service_1.BluetoothService.bluetoothStart();
        }
    }
    Devices.prototype.connectDevice = function (device) {
        bluetooth_service_1.BluetoothService.connectDevice(device);
    };
    Devices.prototype.ngOnDestroy = function () {
        //alert('unloading');
        //BluetoothService.discoveredBluetoothDevices.unsubscribe();
        //BluetoothService.connectedDevice.unsubscribe();
    };
    Devices = __decorate([
        core_1.Component({
            templateUrl: 'devices.html'
        })
    ], Devices);
    return Devices;
}());
exports.Devices = Devices;
