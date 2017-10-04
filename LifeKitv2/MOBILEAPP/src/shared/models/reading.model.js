"use strict";
var Reading = (function () {
    function Reading() {
    }
    Reading.prototype.toString = function () {
        return (this.xCord + ',' + this.yCord + ',' + this.zCord + ',' + this.respirStretch + ',' + this.respirPulse + ',' + this.respirRate);
    };
    return Reading;
}());
exports.Reading = Reading;
