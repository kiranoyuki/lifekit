/**
 * Created by roy_f on 3/14/2017.
 */

import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from "../../environment/environment";
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import {Emergency, ResponderCordinate} from "../models/emergency.model";
import {Address} from "../models/user-setting.model";
import {Geolocation, Geoposition} from "ionic-native";


@Injectable()
export class EmergencyService {
  public static ACCEPT_EMERGENCY:number = 1;
  public hostingEmergencyId;
  public selectedEmergency: Emergency = null;
  public selectedEmergencyOngoing:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public selectedEmergencyUpdate:ReplaySubject<Emergency> = new ReplaySubject<Emergency>(1);

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  //Assistance

  isAssisting():boolean{
    if(this.selectedEmergency){
      return(true);
    }else{
      return(false);
    }
  }



  commentEmergency(emergencyId,comment:string):Observable<any>{
    let path = `/assist/comment?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('emergencyid',emergencyId);
    body.set('comment',comment);
    return(this.apiService.put(path,body).map(res=>{
      return(res);
    },error=>{
      alert(error);
    }));
  }
  assistEmergency(emergency:Emergency, response: number):Observable<any>{
    let path = `/assist/create?accesstoken=${this.jwtService.getAccessToken()}`;
    let body: URLSearchParams = new URLSearchParams();
    body.append('emergencyid', emergency.emergencyid + "");
    body.append('response', response + "");
    return(this.apiService.post(path,body).map(res=>{
      this.selectedEmergencyOngoing.next(true);
      this.selectedEmergency = emergency;
      return(res);
    }, error=>{
      alert(error);
    }));
  }

  cancelAssistEmergency(emergencyId):Observable<any>{
    let path = `/assist/create?accesstoken=${this.jwtService.getAccessToken()}`;
    let body: URLSearchParams = new URLSearchParams();
    body.append('emergencyid', emergencyId);
    body.append('response', 0 + "");
    return(this.apiService.post(path,body).map(res=>{
      this.selectedEmergency = null;
      return(res);
    }, error=>{
      alert(error);
    }));
  }

  //untested khoi
  getEmergencyStatus(emergencyId):Observable<Array<ResponderCordinate>>{
    let path = `/emergency/status?accesstoken=${this.jwtService.getAccessToken()}&emergencyid=${emergencyId}`;
    return(this.apiService.get(path).map(res=>{
      var responderList:Array<ResponderCordinate> = new Array<ResponderCordinate>();
      responderList = res.result;
      console.log(responderList);
      return(responderList);
    }, error=>{
      alert(error);
    }));
  }

  endEmergency(){
    if(this.hostingEmergencyId){
      let path = `/emergency/end?accesstoken=${this.jwtService.getAccessToken()}`;
      let body = new URLSearchParams();
      body.set('emergencyid',this.hostingEmergencyId);
      return(this.apiService.put(path,body).map(res=>{
        this.hostingEmergencyId = null;
        //for now return res
        return(res);
      },error=>{
        alert(error);
      }));
    }else{
      return(new Observable(ob=>{
        ob.next(false);
      }));
    }
  }

  startEmergency(userName:string, address:Address, geo:Geoposition):Observable<number>{
    let path = `/emergency/start?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('lat',geo.coords.latitude.valueOf()+"");
    body.set('lng',geo.coords.longitude.valueOf()+"");
    body.set('user_nickname', userName);
    body.set ('address',JSON.stringify(address));
    return(this.apiService.post(path,body).map(res=>{
      this.hostingEmergencyId = res.result;
      return(res.result);}, error=>{
      alert(error);
    }));
  }

  startEmergency2(userName:string, geo:Geoposition):Observable<number>{
    let path = `/emergency/start?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('lat',geo.coords.latitude.valueOf()+"");
    body.set('lng',geo.coords.longitude.valueOf()+"");
    body.set('user_nickname', userName);
    body.set ('address',"");
    return(this.apiService.post(path,body).map(res=>{
      this.hostingEmergencyId = res.result;
      return(res.result);}, error=>{
      alert(error);
    }));
  }

  updateCarrierLocation(lat:number, lng: number): Observable<Emergency> {
    let path = `/update/location?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('lat',lat.toString());
    body.set('lng',lng.toString());
    return this.apiService.post(path,body).map(res=>{
      return(res);
    }, error=>{
      alert(error);
    });
  }

  reportOnDuty(lat:number,lng:number):Observable<Array<Emergency>>{
    let path = `/emergency/onduty?accesstoken=${this.jwtService.getAccessToken()}&lat=${lat}&lng=${lng}`;
    return this.apiService.get(path).map(res=>{
      var emergencies: Array<Emergency>= new Array();
      var array = res.result;
      array.forEach(function(res:Emergency){
        var temp:Emergency;
        temp = res;
        try{
          res.date = new Date(res.started_at);
          temp.emergency_address = JSON.parse(res.emergency_address + "");
        }catch(e) {

          temp.emergency_address = null;
        }
        emergencies.push(res);
      });

      if(this.isAssisting()){
        var isOngoing = false;
        var theUpdatedEmergency = null;
        emergencies.forEach(e=>{
          if(e.emergencyid == this.selectedEmergency.emergencyid){
            //the emergency is still ongoing. otherwise it is not ongoing...
            isOngoing= true;
            theUpdatedEmergency=e;
          }
        });

        if(!isOngoing){
          //notifies that it is no longer ongoing
          this.selectedEmergencyOngoing.next(false);
        }else{
          //if it is ongoing, then update the locatoin to see if the preson got close to the perosn
          if(theUpdatedEmergency){
            console.log(theUpdatedEmergency);
            this.selectedEmergencyUpdate.next(theUpdatedEmergency);
          }
        }
      }
      return(emergencies);
      }, error=>{
        alert(error);
      }
    );
  }

  awaitCloseToPatient():Promise<any>{
    return(new Promise((resolve,reject)=>{
      var unsubscriber = this.selectedEmergencyUpdate.subscribe(e=>{
        let DISTANCE_CLOSE = 20;
        if(e.distance<=DISTANCE_CLOSE){
          if(unsubscriber){
            unsubscriber.unsubscribe();
          }
          resolve();


        }
      },error=>{
        if(unsubscriber){
          unsubscriber.unsubscribe();
        }
        reject();
      });
    }));
  }

}
