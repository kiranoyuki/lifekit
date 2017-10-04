import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {deepLinkConfig} from "../../app/app.module";

@Component({
    templateUrl: 'dashboard.html'
})
export class Dashboard {
allPages = deepLinkConfig.links;
    constructor(public navCtrl:NavController) {
    }


    open(url){
        this.navCtrl.push(url);
    }
}
