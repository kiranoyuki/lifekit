import {Component, Input} from "@angular/core";
import {NavController} from 'ionic-angular';
import {EmergencyService} from "../../../shared/services/emergency.service";
import {Home} from "../../home/home";

@Component({
  selector: 'e-instruction',
  templateUrl: 'instruction.html'
})

export class Einstruction {
  @Input() etimer = 123;

  // toDo: get patient info from server
  patient = {
    name : 'Micheal Lexon',
    info : 'Non Alergy'
  };



  constructor(public emergencyService: EmergencyService,public navCtrl:NavController){
    var watchEmergency = this.emergencyService.selectedEmergencyOngoing.subscribe(res=>{
      if(!res){
        //emergency is not ongoing anymore
        watchEmergency.unsubscribe();
        alert("The emergency ended...");
        this.emergencyService.cancelAssistEmergency(emergencyService.selectedEmergency.emergencyid).subscribe(res=>{
          console.log(res);
        },error=>{
          console.log(error);
        });
        this.navCtrl.setRoot('home');
      }
    });
  }

  endEmergency() {
    this.navCtrl.setRoot('EndScreen');
  }
}

