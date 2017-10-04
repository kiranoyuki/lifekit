import {UserSettings} from "../../models/user-setting.model";
import {UserSettingsService} from "../user-settings.service";
import {DeviceService} from "../device.service";
import {EmergencyContact} from "../../models/emergency-contact.model";
import {Geoposition, SMS} from "ionic-native";
/**
 * Created by roy_f on 4/11/2017.
 */
export class SMSAllEmergencyContactsProc{
  public userSettings:UserSettings;
  public isContacted:boolean = false;

  constructor(userSettingsService:UserSettingsService,public deviceService:DeviceService){
    this.userSettings = userSettingsService.loadUserSettings();
  }

  public contactAllCancelEmergency(){
    var list = this.deviceService.getEmergencyContacts();
    if(list){
      list.forEach((item:EmergencyContact)=>{
        item.phone.forEach(phone=>{
          if(phone){
            SMS.send(phone.value, this.userSettings.firstName + " has canceled the overdose request...");
          }
        });
      });
    }
  }

  public contactAllStartEmergency(geo:Geoposition){
    //send SMS message
    var list = this.deviceService.getEmergencyContacts();
    if(list){
      list.forEach((item:EmergencyContact)=>{
        console.log(item);
        item.phone.forEach(phone=>{
          console.log(phone);
          if(phone){
            var googleMapUrl = "http://maps.google.com/maps?q=loc:"+geo.coords.latitude+","+geo.coords.longitude;
            SMS.send(phone.value, this.userSettings.firstName + ' Is currently having an overdose. Navigate to: ' + googleMapUrl ).then(res=>{
              this.isContacted = true;
            });
          }
        });
      });
    }
  }
}
