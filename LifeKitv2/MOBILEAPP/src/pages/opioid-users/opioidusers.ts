import {Component} from "@angular/core";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import { ViewController, NavController } from 'ionic-angular';
import {BluetoothService} from "../../shared/services/bluetooth.service";

import { Chart } from "chart.js";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Observable} from "rxjs";
import {FrequencyDeviceFilter} from "../../shared/services/frequency-device-filter";
import {HealthClassification} from "../../shared/services/health-classification.service";

@Component({
    selector: 'opioid-users',
    templateUrl: 'opioidusers.html'
})

export class OpioidUsers {
  displayRespir = -1;
  healthClassification:HealthClassification = new HealthClassification();
  deviceTriggeredEmergency = true; //Default to true so the first time when the device is connected, it won't automatically call an alert, user will have to switch it to false for it to start detecting if there is an overdose and trigging an alert.
  frequencyDeviceFilter: FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
  bluetoothData = "";
  lineCanvas : any;
  lineChart: any;
  connected = false;



  count = 3;

  carrierSetting = {
    onDuty: false,

    hasNaloxone: false
  };

  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {

  }

  ngOnInit(){
    //untested
    this.subscribeBluetoothService();
  }

  subscribeBluetoothService(){
    var  un = BluetoothService.bluetoothData.subscribe(data=> {
      this.connected = true;
      //console.log('data recieved');
      //console.log(data);
      if(this.frequencyDeviceFilter.shouldProcess(data)){
        //console.log('data processed...');
        if(!this.deviceTriggeredEmergency){
          this.updateChart(data);
          if(this.healthClassification.isOverdosingAccel(data.respirRate,data.zCord)){
          //Trigger overdose page.
            this.deviceTriggeredEmergency = true;
            console.log('device emergency triggered is true');
            this.navCtrl.setRoot('emergencyrequest');
          }
        }
      }
    });
  }


  open(url){
    this.navCtrl.push(url);
  }

  setRoot(url){
    this.navCtrl.setRoot(url);

  }
  ngAfterViewInit() {
    this.lineCanvas = document.getElementById('lineCanvas');
    this.loadChart();
  }


  updateChart(data) {
      console.log('updated chart');
      document.getElementById('respiratoryRate').innerHTML = data.respirRate;
      this.lineChart.data.datasets[0].data.splice(0,2);
      this.lineChart.data.labels.splice(0,2);
      this.lineChart.data.datasets[0].data.push({ x: ++this.count, y: data.respirPulse});
      this.lineChart.data.datasets[0].data.push( {x: ++this.count, y: 0});
      this.lineChart.update();
  }

  loadChart() {
      this.lineChart = new Chart(this.lineCanvas, {
        type: 'line',
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        data: {
          datasets: [{
            data: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
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

                stepValue:0.2,

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

  }


}

