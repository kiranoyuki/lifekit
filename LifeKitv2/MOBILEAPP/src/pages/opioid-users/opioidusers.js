"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var bluetooth_service_1 = require("../../shared/services/bluetooth.service");
var chart_js_1 = require("chart.js");
var frequency_device_filter_1 = require("../../shared/services/frequency-device-filter");
var health_classification_service_1 = require("../../shared/services/health-classification.service");
var OpioidUsers = (function () {
    function OpioidUsers(viewCtrl, navCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.healthClassification = new health_classification_service_1.HealthClassification();
        this.deviceTriggeredEmergency = true; //Default to true so the first time when the device is connected, it won't automatically call an alert, user will have to switch it to false for it to start detecting if there is an overdose and trigging an alert.
        this.frequencyDeviceFilter = new frequency_device_filter_1.FrequencyDeviceFilter(5);
        this.bluetoothData = "";
        this.connected = false;
        this.count = 3;
        this.carrierSetting = {
            onDuty: false,
            hasNaloxone: false
        };
    }
    OpioidUsers.prototype.ngOnInit = function () {
        //untested
        this.subscribeBluetoothService();
    };
    OpioidUsers.prototype.subscribeBluetoothService = function () {
        var _this = this;
        bluetooth_service_1.BluetoothService.bluetoothData.subscribe(function (data) {
            _this.connected = true;
            console.log('data recieved');
            console.log(data);
            if (_this.frequencyDeviceFilter.shouldProcess(data)) {
                console.log('data processed...');
                _this.updateChart(data);
                if (!_this.deviceTriggeredEmergency) {
                    if (_this.healthClassification.isOverdosing(data.respirRate)) {
                        //Trigger overdose page.
                        _this.deviceTriggeredEmergency = true;
                        console.log('device emergency triggered is true');
                        _this.navCtrl.setRoot('emergencyrequest', {
                            'deviceTriggeredEmergency': _this.deviceTriggeredEmergency
                        });
                    }
                }
            }
        });
    };
    OpioidUsers.prototype.open = function (url) {
        this.navCtrl.setRoot(url);
    };
    OpioidUsers.prototype.ngAfterViewInit = function () {
        this.lineCanvas = document.getElementById('lineCanvas');
        this.loadChart();
    };
    OpioidUsers.prototype.updateChart = function (data) {
        console.log('updated chart');
        document.getElementById('respiratoryRate').innerHTML = data.respirRate;
        this.lineChart.data.datasets[0].data.splice(0, 2);
        this.lineChart.data.labels.splice(0, 2);
        this.lineChart.data.datasets[0].data.push({ x: ++this.count, y: data.respirPulse });
        this.lineChart.data.datasets[0].data.push({ x: ++this.count, y: 0 });
        this.lineChart.update();
    };
    OpioidUsers.prototype.loadChart = function () {
        this.lineChart = new chart_js_1.Chart(this.lineCanvas, {
            type: 'line',
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            data: {
                datasets: [{
                        data: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                        strokeColor: "rgba(168,0,0,1)",
                        fill: false,
                        radius: 0
                    }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false
                            },
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                stepValue: 0.2,
                            }
                        },
                    ],
                    yAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                max: 1
                            }
                        }]
                },
            }
        });
    };
    OpioidUsers = __decorate([
        core_1.Component({
            selector: 'opioid-users',
            templateUrl: 'opioidusers.html'
        })
    ], OpioidUsers);
    return OpioidUsers;
}());
exports.OpioidUsers = OpioidUsers;
