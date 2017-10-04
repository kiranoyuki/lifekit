import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from "ionic-angular";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from "./app.component";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contacts/contact";
import { Dashboard } from "../pages/dashboard/dashboard";
import { VerificationPage } from "../pages/auth/verification/verification";
import { SignUpPage } from "../pages/auth/signup/signup";
import { Devices } from "../pages/devices/devices";
import { Emergency } from "../pages/emergency/emergency";
import { Carriers } from "../pages/naloxone-carriers/carriers";
import { Settings } from "../pages/settings/settings";
import { OpioidTool } from "../pages/opioid-tool/opioid";
import {SettingsEditUser} from "../pages/settings/setting-edituser/setting-edituser";
import { OpioidUsers } from "../pages/opioid-users/opioidusers";
import { Home } from "../pages/home/home";
import { Start } from "../pages/start/start";
import { NaloxoneLocator } from "../pages/naloxone-locator/naloxone-locator"
import { Einstruction } from '../pages/emergency/instruction/instruction';
import {Elocator} from '../pages/emergency/locator/elocator';
import {EmergencyTimer} from '../pages/emergency/timer/timer';
import {EmergencyRequest} from '../pages/emergency/request/request';

import {
    ApiService,
    UserService,
    JwtService,
    DeviceService
} from "../shared";
import { BluetoothService } from "../shared/services/bluetooth.service";
import { TypeUser } from "../pages/type-user/typeuser";
import {AddFromPhoneEmergencyContact} from "../pages/contacts/add-fromphone-emergency-contact/add-fromphone-emergency-contact";
import {AddNewEmergencyContact} from "../pages/contacts/add-new-emergency-contact/add-new-emergency-contact";
import {LaunchNavigator, Geolocation} from 'ionic-native';
import {EmergencyService} from "../shared/services/emergency.service";
import {EndScreen} from '../pages/emergency/endscreen/endscreen'
import {GooglePlaces} from "../shared/services/googleplaces.service";
import {UserSettingsService} from "../shared/services/user-settings.service";
import {SettingsEditAddr} from "../pages/settings/setting-editaddr/setting-editaddr";
import {Comment} from "../pages/emergency/comment/comment";
import {TestScreen} from '../pages/TESTING/TestScreen'
import {TestComponent} from "../shared/components/TestComponent/TestComponent";
import {GoogleMaps} from "@ionic-native/google-maps";
import {NaloxoneMap} from "../shared/components/MapComponents/NaloxoneMapComponent/naloxone-map";
import {RespondersMap} from "../shared/components/MapComponents/RespondersMapComponent/responders-map";
//import { Auth } from '../pages/auth/auth.module';


export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
    links: [
      {component:TestScreen, name:"testscreen", segment: "testscreen"},
      { component: Comment, name: "comment", segment: "comment" },
      { component: AddFromPhoneEmergencyContact, name: "addfromphoneemergencycontact", segment: "addfromphoneemergencycontact" },
        { component: AddNewEmergencyContact, name: "addnewemergencycontact", segment: "addnewemergencycontact" },
        { component: TypeUser, name: "usertype", segment: "usertype" },
        { component: NaloxoneLocator, name: "naloxonelocator", segment: "naloxonelocator" },
        { component: Home, name: "home", segment: "home" },
        { component: VerificationPage, name: "verificationpage", segment: "verificationpage" },
        { component: SignUpPage, name: "signuppage", segment: "signuppage" },
        { component: Start, name: "start", segment: "start" },
        { component: ContactPage, name: "contact", segment: "contact" },
        { component: AboutPage, name: "about", segment: "about" },
        { component: VerificationPage, name: "verification", segment: "verification" },
        { component: SignUpPage, name: "signup", segment: "signup" },
        { component: Devices, name: "devices", segment: "devices" },
        { component: Emergency, name: "emergency", segment: "emergency" },
        { component: Carriers, name: "carriers", segment: "carriers" },
        { component: Settings, name: "settings", segment: "settings" },
        { component: OpioidTool, name: "opioidtool", segment: "opioidtool" },
        { component: OpioidUsers, name: "opioidusers", segment: "opioidusers" },
        { component: Dashboard, name: "dashboard", segment: "dashboard" },
        { component: Elocator, name: "elocator", segment: "elocator" },
        { component: Einstruction, name: "einstruction", segment: "einstruction" },
        { component: EndScreen, name: "endscreen", segment:"endscreen"},
        { component: EmergencyTimer, name: "emergencytimer", segment:"emergencytimer"},
        { component: EmergencyRequest, name: "emergencyrequest", segment: "emergencyrequest"},
        { component: SettingsEditUser, name: "settingsedituser", segment: "settingsedituser"},
        { component: SettingsEditAddr, name: "settingseditaddr", segment: "settingseditaddr"},


    ]
};
//need to add naloxonelocator
export const menuLinks = [
  {label:'Emergency Contacts', name:'contact', icon: 'contacts'},
  {label:'Naloxone Locator', name:'naloxonelocator', icon:'map'},
  {label:'Manage Devices', name:'devices', icon:'speedometer'},
  {label:'User Settings', name:'settings', icon:'settings'},
  {label:'Opioid Quiz', name:'opioidtool', icon: 'paper'},
  {label:'Help and Information', name:'about', icon: 'information-circle'},
  {label:'TESTING-DASHBOARD',name:'dashboard', icon:'heart'},
  {label:'TEST-SCREEN',name:'testscreen',icon:'heart'}
];

@NgModule({
    declarations: [
      RespondersMap,
      NaloxoneMap,
      TestComponent,
      TestScreen,
      Comment,
      AddNewEmergencyContact,
      AddFromPhoneEmergencyContact,
        TypeUser,
        NaloxoneLocator,
        Start,
        MyApp,
        AboutPage,
        ContactPage,
        VerificationPage,
        SignUpPage,
        Devices,
        Emergency,
        Carriers,
        Settings,
        OpioidTool,
        OpioidUsers,
        Dashboard,
        Home,
        Elocator,
        EndScreen,
        Einstruction,
        EmergencyRequest,
        EmergencyTimer,
        SettingsEditUser,
        SettingsEditAddr
    ],
    imports: [
        //Auth,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp, {}, deepLinkConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      RespondersMap,
      NaloxoneMap,
      TestComponent,
      TestScreen,
      Comment,
      AddNewEmergencyContact,
      AddFromPhoneEmergencyContact,
        TypeUser,
        NaloxoneLocator,
        Start,
        MyApp,
        AboutPage,
        ContactPage,
        Dashboard,
        VerificationPage,
        SignUpPage,
        Devices,
        Emergency,
        Carriers,
        Settings,
        OpioidTool,
        OpioidUsers,
        Home,
        Elocator,
        Einstruction,
        EndScreen,
        EmergencyTimer,
        EmergencyRequest,
        SettingsEditUser,
        SettingsEditAddr
    ],
    providers: [
        JwtService, ApiService, UserService, { provide: ErrorHandler, useClass: IonicErrorHandler },
        ApiService,
        UserService,
        JwtService,
        DeviceService,
        LaunchNavigator,
        EmergencyService,
        Geolocation,
        GooglePlaces,
        UserSettingsService,
        GoogleMaps
    ]
})
export class AppModule {

}
