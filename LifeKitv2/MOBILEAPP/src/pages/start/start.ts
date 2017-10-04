import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AlertController, NavController} from 'ionic-angular';
import {UserService} from "../../shared/services/user.service";
import {Dialogs} from 'ionic-native'

@Component({
  templateUrl: 'start.html'
})

export class Start {
  constructor(public userService:UserService, public alerCtrl: AlertController, public navCtrl: NavController) {
    //window.localStorage.clear();
    setTimeout(() => {
      this.goNextPageAuth();
    }, 1000);
  }

  goNextPageAuth(){
    var res = this.userService.signin().subscribe(res=>{
      console.log("sign in access token: " + res.result);
        this.navCtrl.setRoot('home');
    },res=>{
      this.navCtrl.setRoot('signuppage');
    });
  }
  goNextPage(){
    if(this.userService.isRegistered()) {
      this.navCtrl.setRoot('home');
    }
  }

}
