export class UserSettings {
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
    addresses:Array<Address> = new Array();
}

export class Address {
  houseNumber: number;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  additionalInformation: string;
  gps:Geolocation;

  public toString():string{
    return(this.houseNumber +" "  + this.street +" " +this.city+ " " + this.state + " " +this.zipCode);
  }
}
