import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';
import {JwtService} from "../../../shared/services/jwt.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
    templateUrl: 'verification.html'
})

export class VerificationPage {
    veriCode: number;
    login:{username?:string, password?:string} = {};
    submitted = false;
    modelOk = false;


    onLogin(form:NgForm) {
        this.submitted = true;

        if (form.valid) {
            //this.userData.login(this.login.username);
            //this.navCtrl.push(Dashboard);
        }
    }

    constructor(public userService:UserService, public alerCtrl: AlertController, public navCtrl: NavController) {


    }

    clickSendVeriCode(veriCode:number){
      //Do that post and get thing and then epending on the promised response then do the following
      //for now we are just going to go to the next page on a success....
      //GET BAKC IF THE PERSON IS A NALOXONE CARRIER OR A PATIENT then figure out which to set as root.

      //After post, we should get an refresh token so just save it in the computer manually for now
      //alert('verification code entered:' + veriCode);
      this.userService.validate(veriCode).subscribe(res=>{
        //alert("Refresh Token: " + res);
        this.userService.signin().subscribe(res=>{
          this.navCtrl.setRoot('home');
        });
      });
    }
}
