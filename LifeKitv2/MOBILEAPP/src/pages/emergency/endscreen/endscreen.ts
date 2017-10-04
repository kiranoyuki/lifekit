import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Emergency} from "../emergency";
import {EmergencyService} from "../../../shared/services/emergency.service";
import {EmergencyComment} from "../../../shared/models/EmergencyComment.model";

@Component({
    templateUrl: 'endscreen.html'
})
export class EndScreen {
  public emergencyId;
  public emergencyComment: EmergencyComment = new EmergencyComment();
    constructor(public params:NavParams,public navCtrl:NavController, public er:EmergencyService) {
      this.emergencyId = params.get('emergencyId');
    }

  finish(){
    //send the comment

    this.er.commentEmergency(this.emergencyId,JSON.stringify(this.emergencyComment)).subscribe(res=>{
      this.er.cancelAssistEmergency(this.er.selectedEmergency.emergencyid).subscribe(res=>{
        alert("Thanks for commenting!");
        this.navCtrl.setRoot("home");
      });
    },error=>{
      this.er.cancelAssistEmergency(this.er.selectedEmergency.emergencyid).subscribe(res=>{
        alert("Thanks for commenting!");
        this.navCtrl.setRoot("home");
      });
    });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
