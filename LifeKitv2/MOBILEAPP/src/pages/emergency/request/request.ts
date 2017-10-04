import {Component, ViewChild, ElementRef} from "@angular/core";
import {
  Flashlight, Dialogs, Vibration, Geolocation, Geoposition, SMS, GoogleMapsLatLng,
} from "ionic-native";
import {App, NavController, NavParams} from "ionic-angular";
import {UserSettingsService} from "../../../shared/services/user-settings.service";
import {EmergencyService} from "../../../shared/services/emergency.service";
import {DeviceService} from "../../../shared/services/device.service";
import {GooglePlaces} from "../../../shared/services/googleplaces.service";
import {EmergencyUserProc} from "../../../shared/services/emergencyUserProc/emergencyUserProc";

@Component({
    templateUrl: 'request.html'
})
export class EmergencyRequest {
  @ViewChild('mapCanvas') mapElement: ElementRef;
  public emergencyUserProc: EmergencyUserProc;
    constructor(public navParam: NavParams, userSettingService: UserSettingsService, emergencyService:EmergencyService, geolocation: Geolocation, public googlePlaces: GooglePlaces, public deviceService: DeviceService, public er: EmergencyService, public userSettingsService: UserSettingsService, public navCtrl:NavController, public app: App) {
      this.emergencyUserProc = new EmergencyUserProc(deviceService,userSettingService,emergencyService);
        this.emergencyUserProc.startEmergencyProc();

      app.viewWillLeave.subscribe(res=>{
        //this.cancelRequest();
      });
    }

  cancelRequest(){
    this.emergencyUserProc.stopEmergencyProc().subscribe(res=>{
      let deviceTriggeredEmergency = this.navParam.get('deviceTriggeredEmergency');
      if(deviceTriggeredEmergency){
        this.navCtrl.setRoot('home');
      }else {
        this.navCtrl.setRoot('home');
      }
    });

  }
}
