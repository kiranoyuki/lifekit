/**
 * Created by roy_f on 4/12/2017.
 */
export class FrequencyDeviceFilter {
  public updateFrequency:number = 5;
  private frequencyCounter = 0;

  constructor(updateFrequency:number){
    this.updateFrequency = updateFrequency;
  }

  public shouldProcess(data):boolean {
    if (data.respirPulse > 0) {
      this.frequencyCounter = 0;
      return(true);
    } else {
      if (this.frequencyCounter >= this.updateFrequency) {
        this.frequencyCounter = 0;
        return(true);
      }else{
        this.frequencyCounter++;
        return(false);
      }
    }
  }
}
