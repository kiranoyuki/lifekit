"use strict";
/**
 * Created by roy_f on 4/12/2017.
 */
var FrequencyDeviceFilter = (function () {
    function FrequencyDeviceFilter(updateFrequency) {
        this.updateFrequency = 5;
        this.frequencyCounter = 0;
        this.updateFrequency = updateFrequency;
    }
    FrequencyDeviceFilter.prototype.shouldProcess = function (data) {
        if (data.respirPulse > 0) {
            this.frequencyCounter = 0;
            return (true);
        }
        else {
            if (this.frequencyCounter >= this.updateFrequency) {
                this.frequencyCounter = 0;
                return (true);
            }
            else {
                this.frequencyCounter++;
                return (false);
            }
        }
    };
    return FrequencyDeviceFilter;
}());
exports.FrequencyDeviceFilter = FrequencyDeviceFilter;
