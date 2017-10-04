import {Component, ChangeDetectorRef, ViewChild} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, NavController, App} from 'ionic-angular';
import {deepLinkConfig, menuLinks} from "../../app/app.module";
import {TypeUser} from "../type-user/typeuser";

//need to add naloxonelocator

@Component({
  templateUrl: 'home.html'
})

export class Home {
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: any;
  menu = menuLinks;


  public discoveredBluetoothDevices: any [];
  public bluetoothData: any;

  constructor(public app:App, public platform: Platform, public ref: ChangeDetectorRef) {
    this.rootPage = TypeUser;
    app._setDisableScroll(true);

  }



  open(url){
    this.navCtrl.push(url);
  }

}
