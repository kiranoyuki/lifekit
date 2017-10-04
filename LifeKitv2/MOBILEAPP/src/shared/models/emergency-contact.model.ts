import {Contact, IContactField, ContactField} from "ionic-native";
export class EmergencyContact {
    name: string;
    phone: IContactField[] = [];

    constructor() {}

    static fromContact(contact: Contact): EmergencyContact {
        let emergencyContact = new EmergencyContact();
        emergencyContact.name = contact.displayName;
        if(contact.phoneNumbers) {
          contact.phoneNumbers.forEach(iContact=>{
            if(iContact.value && iContact.value.length>0){
              console.log(iContact.value);
              let temp = new ContactField(iContact.type, iContact.value);
              emergencyContact.phone.push(temp);
            }
          });
        }
        return emergencyContact;
    }


}
