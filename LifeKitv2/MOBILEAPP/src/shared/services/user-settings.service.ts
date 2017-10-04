import {Injectable} from "@angular/core";
import {UserSettings} from "../models/user-setting.model";
/**
 * Created by roy_f on 3/16/2017.
 */
@Injectable()
export class UserSettingsService{
  public saveUserSettings(userSettings:UserSettings){
    console.log('saved:' + userSettings);
    window.localStorage.removeItem('userSettings');
    window.localStorage.setItem('userSettings',JSON.stringify(userSettings));
  }

  public loadUserSettings():UserSettings{
    var temp =JSON.parse(window.localStorage.getItem('userSettings'));
    console.log('loaded: ' + temp);
    return(temp);
  }
}
