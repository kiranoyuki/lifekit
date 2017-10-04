"use strict";
var ionic_native_1 = require("ionic-native");
var rxjs_1 = require("rxjs");
var reading_model_1 = require("../models/reading.model");
/**
 * Created by roy_f on 3/11/2017.
 */
var BluetoothService = (function () {
    function BluetoothService() {
    }
    BluetoothService.bluetoothStart = function () {
        ionic_native_1.BluetoothSerial.isEnabled().then(function (res) { return BluetoothService.bluetoothOn(); }).catch(function (res) { return BluetoothService.bluetoothOff(); });
    };
    BluetoothService.bluetoothOn = function () {
        //alert('Bluetooth is on...');
        BluetoothService.discoverPairedDevices();
        BluetoothService.discoverUnpairedDevices();
    };
    BluetoothService.discoverPairedDevices = function () {
        ionic_native_1.BluetoothSerial.list().then(function (list) {
            BluetoothService.pairedBluetoothDevices = list;
        });
    };
    BluetoothService.discoverUnpairedDevices = function () {
        ionic_native_1.BluetoothSerial.discoverUnpaired().then(function (devices) {
            BluetoothService.discoveredBluetoothDevices.next(devices);
            ionic_native_1.BluetoothSerial.isConnected().catch(function (res) {
                BluetoothService.discoverUnpairedDevices();
            });
        });
    };
    BluetoothService.bluetoothOff = function () {
        alert('Bluetooth is off...');
        //perform trying to turn it on.
        ionic_native_1.BluetoothSerial.enable().then(function (res) { return BluetoothService.bluetoothOn(); }).catch(function (res) { return BluetoothService.bluetoothOff(); });
    };
    BluetoothService.connectDevice = function (device) {
        alert('connecting to device: ' + device.id);
        //connects and subscribes to the status of the connection
        ionic_native_1.BluetoothSerial.connect(device.id).subscribe(function () {
            //alert('connection success');
            BluetoothService.connectedDevice.next(device);
        }, function () {
            //If disconnect then continue with discovery.
            alert('connection failed, continuing discovery');
            BluetoothService.connectedDevice.next(null);
            BluetoothService.discoverUnpairedDevices();
        });
        ionic_native_1.BluetoothSerial.subscribe('\n').subscribe(function (data) {
            //reparse data for Life kit sensor
            var temp = data;
            var array = temp.split(',');
            var reading = new reading_model_1.Reading();
            reading.xCord = Number(array[0]);
            reading.yCord = Number(array[1]);
            reading.zCord = Number(array[2]);
            reading.respirStretch = Number(array[3]);
            reading.respirPulse = Number(array[4]);
            reading.respirRate = Number(array[5]);
            BluetoothService.bluetoothData.next(reading);
            //  this.ref.detectChanges();
        });
    };
    BluetoothService.connectedDevice = new rxjs_1.ReplaySubject(1);
    BluetoothService.discoveredBluetoothDevices = new rxjs_1.ReplaySubject(2);
    BluetoothService.pairedBluetoothDevices = new rxjs_1.ReplaySubject(2);
    BluetoothService.bluetoothData = new rxjs_1.ReplaySubject(2);
    return BluetoothService;
}());
exports.BluetoothService = BluetoothService;
