import {BluetoothSerial} from "ionic-native";
import {ReplaySubject} from "rxjs";
import {Reading} from "../models/reading.model";
/**
 * Created by roy_f on 3/11/2017.
 */


export class BluetoothService{

  public static connectedDevice: ReplaySubject<any> = new ReplaySubject(1);
  public static discoveredBluetoothDevices: ReplaySubject<any> = new ReplaySubject(2);
  public static pairedBluetoothDevices: ReplaySubject<any> = new ReplaySubject(2);
  public static bluetoothData:ReplaySubject<Reading> = new ReplaySubject<Reading>(2);
  constructor(){

  }

  public static bluetoothStart(){
    BluetoothSerial.isEnabled().then(res => BluetoothService.bluetoothOn()).catch(res => BluetoothService.bluetoothOff());
  }

  public static bluetoothOn(){
    //alert('Bluetooth is on...');
    BluetoothService.discoverPairedDevices();
    BluetoothService.discoverUnpairedDevices();
  }

  public static discoverPairedDevices(){
    BluetoothSerial.list().then(list =>{
      BluetoothService.pairedBluetoothDevices = list;
    });
  }

  public static discoverUnpairedDevices(){
    BluetoothSerial.discoverUnpaired().then(devices =>{
      BluetoothService.discoveredBluetoothDevices.next(devices);
      BluetoothSerial.isConnected().catch(res =>{
        BluetoothService.discoverUnpairedDevices();
      })
    });
  }
  public static bluetoothOff(){
    alert('Bluetooth is off...');
    //perform trying to turn it on.
    BluetoothSerial.enable().then(res=>BluetoothService.bluetoothOn()).catch(res=>BluetoothService.bluetoothOff());
  }

  public static connectDevice(device){
    alert('connecting to device: ' + device.id);

    //connects and subscribes to the status of the connection
    BluetoothSerial.connect(device.id).subscribe(function(){
      //alert('connection success');
      BluetoothService.connectedDevice.next(device);
    },function(){
      //If disconnect then continue with discovery.
      alert('connection failed, continuing discovery');
      BluetoothService.connectedDevice.next(null);
      BluetoothService.discoverUnpairedDevices();
    });
    BluetoothSerial.subscribe('\n').subscribe(data => {
      //reparse data for Life kit sensor
      var temp:String = data;
      var array = temp.split(',');
      var reading:Reading = new Reading();
      reading.xCord = Number(array[0]);
      reading.yCord = Number(array[1]);
      reading.zCord = Number(array[2]);
      reading.respirStretch = Number(array[3]);
      reading.respirPulse = Number(array[4]);
      reading.respirRate = Number(array[5]);
      BluetoothService.bluetoothData.next(reading);
    //  this.ref.detectChanges();
    });
  }

}
