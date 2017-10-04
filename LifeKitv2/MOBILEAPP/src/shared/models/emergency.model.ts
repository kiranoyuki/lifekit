
import {Address} from "./user-setting.model";
export class Emergency{

  /*
  Json data expected from server
   "emergencyid": 3,
   "status": 0,
   "emergency_lat": 21.1619,
   "emergency_lng": -86.8515,
   "emergency_address": null,
   "started_at": "2017-03-10T21:21:24.000Z",
   "ended_at": null
   */
  public user_nickname:string;
  public emergencyid: number;
  public status: number;
  public emergency_lat: number;
  public emergency_lng: number;
  public emergency_address: Address;
  public started_at: string;
  public ended_at: string;
  public distance: number;
  public date: any;

}

export class ResponderCordinate{
  public last_lat:number;
  public last_lng:number;
}
