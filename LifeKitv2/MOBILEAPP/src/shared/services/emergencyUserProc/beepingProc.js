"use strict";
var ionic_native_1 = require("ionic-native");
var rxjs_1 = require("rxjs");
/**
 * Created by roy_f on 4/11/2017.
 */
var BeepingProc = (function () {
    function BeepingProc() {
    }
    BeepingProc.prototype.startBeepingProc = function () {
        this.beepingIntervalID = rxjs_1.Observable.interval(1000).subscribe(function () {
            ionic_native_1.Dialogs.beep(1);
        });
    };
    BeepingProc.prototype.stopBeepingProc = function () {
        if (this.beepingIntervalID) {
            this.beepingIntervalID.unsubscribe();
        }
    };
    return BeepingProc;
}());
exports.BeepingProc = BeepingProc;
