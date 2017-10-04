import {FlashLightProc} from "./flashlightProc";
import {VibrateProc} from "./vibrateProc";
import {BeepingProc} from "./beepingProc";
import {CountDownProc} from "./countDownProc";
import {SMSAllEmergencyContactsProc} from "./smsAllEmergenecyContactsProc";
import {Emergency} from "../../../pages/emergency/emergency";
import {EmergencyService} from "../emergency.service";
import {UserSettingsService} from "../user-settings.service";
import {UserSettings, Address} from "../../models/user-setting.model";
import {Geolocation, Geoposition} from "ionic-native";
import {DeviceService} from "../device.service";
import {Observable, Observer} from "rxjs";
export class EmergencyUserProc {

  public flashLightProc: FlashLightProc = new FlashLightProc();
  public vibrateProc: VibrateProc = new VibrateProc();
  public beepingProc: BeepingProc = new BeepingProc();
  public countDownProc:CountDownProc = new CountDownProc();
  public smsAllEmergencyContactsProc: SMSAllEmergencyContactsProc = new SMSAllEmergencyContactsProc(this.userSettingService,this.deviceService);
  public userSettings:UserSettings;


  public emergencyOngoing:boolean = false;
  constructor(public deviceService:DeviceService,public userSettingService: UserSettingsService, public emergencyService:EmergencyService){
  this.userSettings = userSettingService.loadUserSettings();
}
  public startEmergencyProc(){
    //this.flashLightProc.startFlashing();
    this.vibrateProc.startVibrate();
    this.beepingProc.startBeepingProc();
    this.countDownProc.startTimerTillEnd().then(()=>{
      console.log('count down reached!');
      Geolocation.getCurrentPosition().then(geo=>{
        this.startEmergencyWithServer(geo).subscribe(res=>{
          console.log('geolocation found preparing to notify server and contacts...');
          console.log(res);
        },error=>{
          console.log("Error!");
          console.log(error);
        });
        this.smsAllEmergencyContactsProc.contactAllStartEmergency(geo);
      });
    });

  }

  public stopEmergencyProc():Observable<any>{
    try{
      this.countDownProc.stopTimerBeforeEnd();
    }catch(e){
      console.log(e);
    }
    //this.flashLightProc.stopFlashing();
    this.vibrateProc.stopVibrate();
    this.beepingProc.stopBeepingProc();
    if(this.smsAllEmergencyContactsProc.isContacted){
      this.smsAllEmergencyContactsProc.contactAllCancelEmergency();
    }
    return(this.endEmergencyWithServer());
  }

  public endEmergencyWithServer():Observable<any>{
    return(this.emergencyService.endEmergency())
  }

    public startEmergencyWithServer(geolocation:Geoposition):Observable<any>{
    let address: Address = null;
    let firstName: string = "no name";
    if(this.userSettings&&this.userSettings.firstName){
      firstName = this.userSettings.firstName;
    }

    if(this.userSettings&&this.userSettings.addresses&&this.userSettings.addresses[0]){
      address = this.userSettings.addresses[0];
      return(this.emergencyService.startEmergency(firstName,address,geolocation));
    }else{
      return(this.emergencyService.startEmergency2(firstName,geolocation));
    }


  }




}
