import {Component} from "@angular/core";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    about: string = "naloxone-about";
    
    constructor() {
        this.about = "naloxone-about";
    }

	
}
