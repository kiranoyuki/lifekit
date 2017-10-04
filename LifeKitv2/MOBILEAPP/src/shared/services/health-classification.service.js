/**
 * Created by roy_f on 4/12/2017.
 */
"use strict";
var HealthClassification = (function () {
    function HealthClassification() {
        this.currentNumBadRespiratoryReadings = 0;
    }
    HealthClassification.prototype.isOverdosing = function (respirRate) {
        if (HealthClassification.LOWER_THAN_OVERDOSE_RESPIRATORY_RATE > respirRate && respirRate > 0) {
            this.currentNumBadRespiratoryReadings++;
            if (this.currentNumBadRespiratoryReadings > HealthClassification.NUM_BAD_RESPIRATORY_READINGS_ALLOWED) {
                this.currentNumBadRespiratoryReadings = 0;
                return (true);
            }
            else {
                return (false);
            }
        }
        else {
            return (false);
        }
    };
    HealthClassification.LOWER_THAN_OVERDOSE_RESPIRATORY_RATE = 7;
    HealthClassification.NUM_BAD_RESPIRATORY_READINGS_ALLOWED = 1;
    return HealthClassification;
}());
exports.HealthClassification = HealthClassification;
