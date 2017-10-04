/**
 * Created by roy_f on 4/12/2017.
 */

export class HealthClassification{
  public static LOWER_THAN_OVERDOSE_RESPIRATORY_RATE = 7;
  public static NUM_BAD_RESPIRATORY_READINGS_ALLOWED = 20;

  public currentNumBadRespiratoryReadings = 0;

  public isOverdosing(respirRate:number):boolean{
    if(HealthClassification.LOWER_THAN_OVERDOSE_RESPIRATORY_RATE>respirRate&& respirRate>0){
      this.currentNumBadRespiratoryReadings++;
      if(this.currentNumBadRespiratoryReadings>HealthClassification.NUM_BAD_RESPIRATORY_READINGS_ALLOWED){
        this.currentNumBadRespiratoryReadings = 0;
        return(true);
      }else{
        return(false);
      }
    }else{
      return(false);
    }
  }

  public isOverdosingAccel(respirRate:number, accelZ:number):boolean{
    if(HealthClassification.LOWER_THAN_OVERDOSE_RESPIRATORY_RATE>respirRate&& respirRate>0 && accelZ>-10000){
      this.currentNumBadRespiratoryReadings++;
      if(this.currentNumBadRespiratoryReadings>HealthClassification.NUM_BAD_RESPIRATORY_READINGS_ALLOWED){
        this.currentNumBadRespiratoryReadings = 0;
        return(true);
      }else{
        return(false);
      }
    }else{
      return(false);
    }
  }
}
