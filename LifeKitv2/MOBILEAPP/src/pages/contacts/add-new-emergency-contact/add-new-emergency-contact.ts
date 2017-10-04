import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {DeviceService} from "../../../shared/services/device.service";
import {Contact, Contacts, ContactField} from "ionic-native";
import {EmergencyContact} from "../../../shared/models/emergency-contact.model";

@Component({
    templateUrl: 'add-new-emergency-contact.html'
})
export class AddNewEmergencyContact {
  public phoneNumber:string;
  public firstName:string;
  public lastName:string;
  constructor(public navParam: NavParams, public deviceService: DeviceService, public navCtrl:NavController) {
      var contact:EmergencyContact = navParam.get('person');
    }

    public createContact(){
      this.deviceService.createEmergencyContact(this.lastName,this.firstName,this.phoneNumber);
      this.navCtrl.pop();
    }

}
