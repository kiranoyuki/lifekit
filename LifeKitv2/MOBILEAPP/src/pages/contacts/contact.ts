import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DeviceService} from "../../shared/services/device.service";
import {Contact, Dialogs, ContactField} from "ionic-native";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
    constructor(public deviceService: DeviceService, public navCtrl:NavController) {
      //need to loo through the emergency contacts list
    }

    public showsContactInformation(contact){
      //console.log(contact.phone);
      var temp = "";
      contact.phone.forEach(function(ele:ContactField){
        temp = temp+ " "+ele.type +": " + ele.value + "\n";
      })
      Dialogs.alert("Name: " + contact.name + "  Number: " + temp);
    }


}
