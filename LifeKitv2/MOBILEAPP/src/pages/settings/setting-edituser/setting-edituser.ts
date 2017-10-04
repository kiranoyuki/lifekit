import {Component, Input} from "@angular/core";
import {UserSettings} from "../../../shared/models/user-setting.model";
import {UserSettingsService} from "../../../shared/services/user-settings.service";

@Component({
    templateUrl: 'setting-edituser.html'
})


export class SettingsEditUser {
  @Input()  userSettings:UserSettings;

    constructor(public userSettingsService:UserSettingsService){

    }
}
