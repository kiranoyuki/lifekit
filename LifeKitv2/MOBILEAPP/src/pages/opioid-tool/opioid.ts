import {Component} from "@angular/core";
import {interval} from "rxjs/observable/interval";
import {BluetoothSerial, Dialogs} from "ionic-native";

@Component({
    selector: 'page-opioid-tool',
    templateUrl: 'opioid.html'
})
export class OpioidTool {
    public gender;
    public age;
    public fAlcohol;
    public fIDrugs;
    public fPDrugs;
    public pAlcohol;
    public pIDrugs;
    public pPDrugs;
    public pSex;
    public pDisease;
    public pSad;
    public pain;
    private sum;
    about: string = "tool-about";
    constructor() {
        this.about = "tool-about";
    }

    public submit()
    {
        if(!(this.gender && this.age))
        {
            alert("Please enter your gender and describe your age.");
            return;
        }
        if(isNaN(this.age))
            this.sum = 0;
        else
            this.sum = Math.floor(this.pain / 3);
        if(this.gender == 'm')
        {
            if(this.fAlcohol)
                this.sum += 3;
            if(this.fIDrugs)
                this.sum += 3;
        }
        else if(this.gender == 'f')
        {
            if(this.fAlcohol)
                this.sum += 1;
            if(this.fIDrugs)
                this.sum += 2;
            if(this.pSex)
                this.sum += 3;
        }
        if(this.age == 'yes')
            this.sum += 1;
        if(this.fPDrugs)
            this.sum += 4;
        if(this.pAlcohol)
            this.sum += 3;
        if(this.pIDrugs)
            this.sum += 4;
        if(this.pPDrugs)
            this.sum += 5;
        if(this.pDisease)
            this.sum += 2;
        if(this.pSad)
            this.sum += 1;

        if(this.sum >= 8)
            alert("You are at a severe risk of an overdose. Please contact your doctor and only take your medication as specified.");
        else if(this.sum == 7)
            alert("You are at a moderate risk of an overdose.  Please proceed with caution.");
        else
            alert("You are at a mild risk of an overdose. Please proceed with caution.");
    }
}
