import {Component, ChangeDetectorRef} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, App} from 'ionic-angular';
import {BluetoothService} from "../../shared/services/bluetooth.service";
import {Observable} from "rxjs";
import {OnDestroy}from '@angular/core';
@Component({
    templateUrl: 'devices.html'
})
export class Devices implements OnDestroy {
public connectedDevice:any;
public discoveredBluetoothDevices: any;
public pairedBluetoothDevices: any;
public bluetoothData: any;

    constructor(public app:App,public platform: Platform, public ref: ChangeDetectorRef) {
      app.viewDidLoad.subscribe(res=>{

      });
			if(this.platform.is('android')){
			//alert("I am android!")
			//Call get list of connectable devices

      BluetoothService.discoveredBluetoothDevices.subscribe(list =>{
        this.discoveredBluetoothDevices = list;
        //this.ref.detectChanges();
      });
      BluetoothService.connectedDevice.subscribe(device=>{
        this.connectedDevice = device;
        //this.ref.detectChanges();
      });

      BluetoothService.bluetoothStart();
		}
    }

    connectDevice(device){
      BluetoothService.connectDevice(device);
    }

    ngOnDestroy(){
      //alert('unloading');
      //BluetoothService.discoveredBluetoothDevices.unsubscribe();
      //BluetoothService.connectedDevice.unsubscribe();
    }



}
