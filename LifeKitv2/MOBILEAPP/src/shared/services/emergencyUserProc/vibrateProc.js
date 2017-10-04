"use strict";
var ionic_native_1 = require("ionic-native");
var rxjs_1 = require("rxjs");
/**
 * Created by roy_f on 4/10/2017.
 */
var VibrateProc = (function () {
    function VibrateProc() {
    }
    VibrateProc.prototype.startVibrate = function () {
        console.log('started vibrate');
        this.vibrateIntervalObserverRef = rxjs_1.Observable.interval(this.vibrateTime).subscribe(function (res) {
            ionic_native_1.Vibration.vibrate(500);
        });
    };
    VibrateProc.prototype.stopVibrate = function () {
        if (this.vibrateIntervalObserverRef) {
            this.vibrateIntervalObserverRef.unsubscribe();
        }
    };
    return VibrateProc;
}());
exports.VibrateProc = VibrateProc;
