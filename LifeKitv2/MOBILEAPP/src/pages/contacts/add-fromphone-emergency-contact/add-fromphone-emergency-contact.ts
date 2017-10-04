import {Component} from "@angular/core";
import {DeviceService} from "../../../shared/services/device.service";

@Component({
    templateUrl: 'add-fromphone-emergency-contact.html'
})
export class AddFromPhoneEmergencyContact {
contacts: any;
    constructor(public deviceService: DeviceService) {
      deviceService.getAllPhoneContacts().then(list=>{
        this.contacts = list.sort((c1, c2) => {
          var str1;
          var str2;

          if(!c1.displayName){
            str1 = null;
          }else{
            str1 = c1.displayName.toUpperCase();
          }

          if(!c2.displayName){
            str2 = null;
          }else{
            str2 = c2.displayName.toUpperCase();
          }

          if(str1 && !str2){
            return(1);
          }else if(str2 && !str1){
            return(-1);
          }
           else if(str1 > str2){
            return(1);
          }else if(str2 > str1){
            return(-1);
          }else{
            return(0);
          }
        });
      });
    }

    public addEmergencyContact(contact){
      console.log(contact);
      alert('Adding emergency contact ' + contact.displayName);
      if(contact.phoneNumbers){
        //It has phone numbers then add...
        this.deviceService.addEmergencyContact(contact);
      }else{
        alert('Contact has no phone numbers...');
      }
    }

}
