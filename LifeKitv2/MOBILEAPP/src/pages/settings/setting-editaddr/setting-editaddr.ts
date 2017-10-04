import {Component} from "@angular/core";
import {UserSettings, Address} from "../../../shared/models/user-setting.model";
import {UserSettingsService} from "../../../shared/services/user-settings.service";
import {ViewController, NavParams} from "ionic-angular";

@Component({
    templateUrl: 'setting-editaddr.html'
})
export class SettingsEditAddr {
public address:Address = new Address();
  constructor(public param: NavParams, public viewCtrl: ViewController){
  }

  addThenDismiss(){
    this.viewCtrl.dismiss(this.address);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
