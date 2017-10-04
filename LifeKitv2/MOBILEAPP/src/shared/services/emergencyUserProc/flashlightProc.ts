import {Flashlight} from "ionic-native";
import { Observable} from "rxjs";
/**
 * Created by roy_f on 4/10/2017.
 */

export class FlashLightProc{
      flashLightTime: 1000;
      flashLightIntervalObserverRef;

  public startFlashing(){
    console.log('started flashing');
    this.flashLightIntervalObserverRef = Observable.interval(this.flashLightTime).subscribe(res=>{
      if(Flashlight.isSwitchedOn()){
        Flashlight.switchOff();
      }else{
        Flashlight.switchOn();
      }
    });
  }

  public stopFlashing(){
    if(this.flashLightIntervalObserverRef){
      this.flashLightIntervalObserverRef.unsubscribe();
    }
    Flashlight.switchOff();
  }
}
