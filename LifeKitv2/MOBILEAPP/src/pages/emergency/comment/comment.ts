import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {EmergencyService} from "../../../shared/services/emergency.service";

@Component({
  templateUrl: 'comment.html'
})
export class Comment {
public emergencyId;
public comment:string = "";
  constructor(public er:EmergencyService, public params: NavParams, public navCtrl:NavController) {
    this.emergencyId = params.get('emergencyId');
  }

  finish(){
    //send the comment
    this.er.commentEmergency(this.emergencyId,this.comment).subscribe(res=>{
      alert("Thanks for commenting!");
      this.navCtrl.popToRoot();
    });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
