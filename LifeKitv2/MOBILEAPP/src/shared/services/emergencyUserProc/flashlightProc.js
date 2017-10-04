"use strict";
var ionic_native_1 = require("ionic-native");
var rxjs_1 = require("rxjs");
/**
 * Created by roy_f on 4/10/2017.
 */
var FlashLightProc = (function () {
    function FlashLightProc() {
    }
    FlashLightProc.prototype.startFlashing = function () {
        console.log('started flashing');
        this.flashLightIntervalObserverRef = rxjs_1.Observable.interval(this.flashLightTime).subscribe(function (res) {
            if (ionic_native_1.Flashlight.isSwitchedOn()) {
                ionic_native_1.Flashlight.switchOff();
            }
            else {
                ionic_native_1.Flashlight.switchOn();
            }
        });
    };
    FlashLightProc.prototype.stopFlashing = function () {
        if (this.flashLightIntervalObserverRef) {
            this.flashLightIntervalObserverRef.unsubscribe();
        }
        ionic_native_1.Flashlight.switchOff();
    };
    return FlashLightProc;
}());
exports.FlashLightProc = FlashLightProc;
