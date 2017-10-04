import {Observable} from "rxjs";
/**
 * Created by roy_f on 4/11/2017.
 */
export class CountDownProc{
  //Time limit in seconds
  private static TIME_LIMIT = 10;
  private timer:Observable<any> = Observable.timer(0,1000);
  private timerOb:any;
  public countingDownTime:number = CountDownProc.TIME_LIMIT;
  public triggeredStopTimer:boolean = false;

  public stopTimerBeforeEnd(){
    this.triggeredStopTimer = true;
  }
  //Start Timer returns the promise when the timer is up for it to be resolved.
  public startTimerTillEnd():Promise<any>{
    this.triggeredStopTimer = false;
    return(new Promise((resolve, reject)=>{
      this.timerOb = this.timer.subscribe(t=>{
        this.countingDownTime = this.countingDownTime - 1;
        if(this.countingDownTime <=0){
          if(this.timerOb){
            this.timerOb.unsubscribe();
            //action when the timer has when down ....
            resolve();
          }
        }else if(this.triggeredStopTimer){
          this.timerOb.unsubscribe();
          reject();
        }
      });
    }));
  }
}
