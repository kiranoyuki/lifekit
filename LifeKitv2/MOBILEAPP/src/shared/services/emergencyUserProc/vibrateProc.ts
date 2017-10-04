import {Vibration} from "ionic-native";
import {Observable} from "rxjs";
/**
 * Created by roy_f on 4/10/2017.
 */

export class VibrateProc{
    //Time indicates how long it waits till it vibrates again.
    vibrateTime: 4000;
    vibrateIntervalObserverRef;

  public startVibrate(){
    console.log('started vibrate');
    this.vibrateIntervalObserverRef = Observable.interval(this.vibrateTime).subscribe(res=>{
      Vibration.vibrate(500);
    });
  }

  public stopVibrate(){
    if(this.vibrateIntervalObserverRef){
      this.vibrateIntervalObserverRef.unsubscribe();
    }
  }
}
