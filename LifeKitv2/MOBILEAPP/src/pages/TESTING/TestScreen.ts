/**
 * Created by roy_f on 4/26/2017.
 */
import {Component} from "@angular/core";
import {TestSuite} from "../../shared/components/TestComponent/Test";
import {GooglePlaces} from "../../shared/services/googleplaces.service";
import {Geolocation, BluetoothSerial} from "ionic-native";
import {GooglePlace} from "../../shared/models/GooglePlace";
import {BluetoothService} from "../../shared/services/bluetooth.service";
import {FrequencyDeviceFilter} from "../../shared/services/frequency-device-filter";
@Component({
  templateUrl:'TestScreen.html'
})

export class TestScreen{
  public testTestSuite:TestSuite = new TestSuite("Test The Test Suite");
  public testGooglePlacesService:TestSuite = new TestSuite('Test Google Places Service');
  public testBluetoothService:TestSuite = new TestSuite('Test Bluetooth Service');
  public testFrequencyDeviceFilter:TestSuite = new TestSuite('Test Frequency Device Filter');

  constructor(public googlePlacesService:GooglePlaces, public geo:Geolocation){
    //Add the test you want here with the template for how to make a test in the test class
    this.testTestSuite.addTest("The Test Class To Default Succeed",new Promise((resolve, reject)=>{
      resolve();
    }));
    this.testTestSuite.addTest("The Test Class To Default Fail", new Promise((resolve,reject)=>{
      reject();
    }));
    this.testTestSuite.runAllTest();

    this.testGooglePlacesService.addTest('getGoogleDetailed http request', new Promise((resolve,reject)=>{
      googlePlacesService.getGoogleDetailed("EisxMyBNYXJrZXQgU3RyZWV0LCBXaWxtaW5ndG9uLCBOQyAyODQwMSwgVVNB").subscribe(res=>{
        if(res){
          resolve();
        }else{
          reject();
        }
      });
    }));
    this.testGooglePlacesService.addTest('getGoogleDetailed return correct json', new Promise((resolve,reject)=>{
      googlePlacesService.getGoogleDetailed("EisxMyBNYXJrZXQgU3RyZWV0LCBXaWxtaW5ndG9uLCBOQyAyODQwMSwgVVNB").subscribe(res=>{
        var temp:GooglePlace = res;
        if(temp.name){
          resolve();
        }else{
          reject();
        }
      });
    }));
    this.testGooglePlacesService.addTest('getGooglePlaces http request', new Promise((resolve,reject)=>{
      Geolocation.getCurrentPosition().then(res=>{
        googlePlacesService.getGooglePlaces('pharmacy',res,5000,5).subscribe(res=>{
          if(res){
            resolve();
          }else{
            reject();
          }

        });
      });
    }));
    this.testGooglePlacesService.addTest('getGooglePlaces correct return json', new Promise((resolve,reject)=>{
      Geolocation.getCurrentPosition().then(res=>{
        googlePlacesService.getGooglePlaces('pharmacy',res,5000,5).subscribe(res=>{
          var temp:GooglePlace[] = res;
          temp.forEach((item:GooglePlace)=>{
            console.log(item);
            if(!(item.name)){
             reject();
            }
          });
          resolve();
        });
      });
    }));
    this.testGooglePlacesService.runAllTest();

    this.testBluetoothService.addTest('Bluetooth availability on device', new Promise((resolve,reject)=>{
      BluetoothSerial.enable().then(res=>{
        if(BluetoothSerial.isEnabled()){
          resolve();
        }else{
          reject();
        }
      });
    }));
    this.testBluetoothService.runAllTest();

    this.testFrequencyDeviceFilter.addTest('shouldProcess On respir pulse gives true to process data',new Promise((resolve,reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      if(fd.shouldProcess({respirPulse:1})){
        resolve();
      }else{
        reject();
      }
    }));
    this.testFrequencyDeviceFilter.addTest('shouldProcess Processes anyway if obtained 5 readings',new Promise((resolve, reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        resolve();
      }else{
        reject();
      }
    }));
    this.testFrequencyDeviceFilter.addTest('shouldProcess On no respir pulse and not obtained 5 readings, does not process',new Promise((resolve, reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      var i = 0;
      for(i;i<5;i++){
        //sends no pulse however on the 5th one sends a pulse
        if(fd.shouldProcess({respirPulse:0})){
          reject();
        }
      }
      resolve();
    }));
    this.testFrequencyDeviceFilter.addTest('shouldProcess Processes if obtained no pulse but then obtain pulse',new Promise((resolve, reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:1})){
        resolve();
      }else{
        reject();
      }

    }));
    this.testFrequencyDeviceFilter.addTest('shouldProcess Processes if counter reaches x number of readings',new Promise((resolve, reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        resolve();
      }
      reject();

    }));
    this.testFrequencyDeviceFilter.addTest('shouldProcess if it resets the counter and processes on the x numbered reading again',new Promise((resolve, reject)=>{
      var fd:FrequencyDeviceFilter = new FrequencyDeviceFilter(5);
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        reject();
      }
      if(fd.shouldProcess({respirPulse:0})){
        resolve();
      }
      reject();

    }));
    this.testFrequencyDeviceFilter.runAllTest();
  }
}

