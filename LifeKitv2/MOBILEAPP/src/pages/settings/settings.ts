import {Component, ChangeDetectorRef, AfterViewInit} from "@angular/core";
import {NavController, ViewController, ModalController} from "ionic-angular";
import {UserSettings, Address} from "../../shared/models/user-setting.model";
import {UserSettingsService} from "../../shared/services/user-settings.service";
import {SettingsEditAddr} from "./setting-editaddr/setting-editaddr";

@Component({
    templateUrl: 'settings.html'
})
export class Settings {
  public userSettings:UserSettings = new UserSettings();

    constructor(public modalCtrl:ModalController, public ref: ChangeDetectorRef, public userSettingsService: UserSettingsService,public navCtrl:NavController) {


    }

    ngOnInit(){
      var loaded:UserSettings = this.userSettingsService.loadUserSettings();
      if(loaded){
        console.log(loaded);
        this.userSettings = loaded;
      }else{
        console.log(loaded);
      }
    }

  ionViewWillUnload(){
      console.log('unloading view.... saving content.');
      this.userSettingsService.saveUserSettings(this.userSettings);
  }

  presentAddAddressModal(){
    let add = this.modalCtrl.create(SettingsEditAddr,this.userSettings);
    add.onDidDismiss((res:Address)=>{
      if(res){
        this.userSettings.addresses.push(res);
      }
    });
    add.present();
  }

  remove(index:number){
    this.userSettings.addresses.splice(index,1);
  }
}
