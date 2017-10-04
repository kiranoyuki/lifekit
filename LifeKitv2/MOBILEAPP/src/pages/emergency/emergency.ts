import {Component} from "@angular/core";
import {Flashlight, Vibration} from "ionic-native";
import {App} from "ionic-angular";

@Component({
    templateUrl: 'emergency.html'
})
export class Emergency {
  public static flashLight = {
    flashLightTime: 1000,
    flashLightIntervalID:0
  };

  public static vibrate = {
    vibrateTime: 1000,
    vibrateIntervalID:0
  };
    constructor(public app: App) {

    }
}
