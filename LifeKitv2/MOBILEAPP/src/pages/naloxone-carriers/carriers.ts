import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Geolocation, Dialogs, SMS} from "ionic-native";
import {EmergencyService} from "../../shared/services/emergency.service";
import {Emergency} from "../../shared/models/emergency.model";
import {ReplaySubject, Observable} from "rxjs";
import {TypeUser} from "../type-user/typeuser";
import {JwtService} from "../../shared/services/jwt.service";


@Component({
    selector: 'carrier',
    templateUrl: 'carriers.html'
})

export class Carriers {
  @Input() emergencies:Array<Emergency> = new Array<Emergency>();
  @Input() onDutyToggled: boolean;

  public static sendingLocationInterval = 7000;
  public static ondutyInterval = 5000;
  public onDutyToggledObserver:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public sendLocationOb:Observable<any>;
  public pageReportDutyOb:Observable<any>;
  public unsubSendLocation:Array<any> = new Array<any>();
  public unsubPageReport:Array<any> = new Array<any>();
  public lastNumberEmergrencies = 0;


  carrierSetting = {
      onDuty: true,
      hasNaloxone: true
  };


  constructor(public em: EmergencyService, public jwtService: JwtService, public emergencyService:EmergencyService, public navCtrl: NavController) {

  }

  acceptTask(emergency){
    this.em.assistEmergency(emergency,EmergencyService.ACCEPT_EMERGENCY).subscribe(res=>{
      //the emegrency has been accepted
      Dialogs.alert("Emergency Accepted!");
      this.navCtrl.push('elocator',{
        Emergency: emergency
      });
    }
    );
  }

  sendLocation(){
    Geolocation.getCurrentPosition().then(resp=>{
      console.log("reporting location");
      this.emergencyService.updateCarrierLocation(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
        console.log(res);
      });
    });
  }

  pageReportOnDuty(){
    Geolocation.getCurrentPosition().then(resp=>{
      console.log('reporting for duty');
      this.emergencyService.reportOnDuty(resp.coords.latitude,resp.coords.longitude).subscribe((res:Array<Emergency>)=>{
        res.forEach(e=>{
          var isExist = false;
          this.emergencies.forEach(ePrime=>{
              if(ePrime.emergencyid ==e.emergencyid){
                isExist = true;
              }
            });
          if(isExist){
            //Do nothing
          }else{
            //send SMS to notify there is a new emergency
            SMS.send(this.jwtService.getTelephoneNumber(),"LifeKit Alert!- Emergency Patient Needs Help!");
          }
        });
        this.emergencies = res;
        //check if there are new emergencys, if there are, then send a notification to the phone
      });
    });
  }

  ngDoCheck(){
    if(this.onDutyToggled){
      //run run code for carrier actions
      if(this.unsubSendLocation.length==0) {
        console.log('subscribing...');
        this.sendLocationOb = Observable.timer(0, Carriers.sendingLocationInterval);
        this.unsubSendLocation.push(this.sendLocationOb.subscribe(t => {
          this.sendLocation();
        }));
      }
      if(this.unsubPageReport.length==0) {
        console.log('subscribing...');
        this.pageReportDutyOb = Observable.timer(0, Carriers.ondutyInterval);
        this.unsubPageReport.push(this.pageReportDutyOb.subscribe(t => {
          this.pageReportOnDuty();
        }));
      }
    }else{
      //run stop code for any carrier actions
      if(this.unsubSendLocation.length>0){
        console.log('unsubscribe from sending location');
        this.unsubSendLocation.forEach(function(res){
          res.unsubscribe();
        });
        this.unsubSendLocation = new Array();
      }
      if(this.unsubPageReport.length>0){
        console.log('unsubscribe from duty');
        this.unsubPageReport.forEach(function(res){
          res.unsubscribe();
        });
        this.unsubPageReport = new Array();
      }
    }
  }

  open(url){
    this.navCtrl.push(url);
  }



}
