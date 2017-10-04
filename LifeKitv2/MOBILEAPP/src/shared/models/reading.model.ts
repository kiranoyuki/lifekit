export class Reading {
    xCord: number;
    yCord: number;
    zCord: number;
    respirStretch: number;
    respirPulse: number;
    respirRate: number;

    public toString(): string{
      return(this.xCord+','+this.yCord+','+this.zCord+','+this.respirStretch+','+this.respirPulse+','+this.respirRate);
    }
}
