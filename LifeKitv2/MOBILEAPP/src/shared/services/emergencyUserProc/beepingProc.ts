import {Dialogs} from "ionic-native";
import {Observable} from "rxjs";
/**
 * Created by roy_f on 4/11/2017.
 */
export class BeepingProc{

  public beepingIntervalID;

  public startBeepingProc(){

    this.beepingIntervalID = Observable.interval(1000).subscribe(()=>{
      Dialogs.beep(1);
    });
  }

  public stopBeepingProc(){
    if(this.beepingIntervalID){
      this.beepingIntervalID.unsubscribe();
    }
  }
}
