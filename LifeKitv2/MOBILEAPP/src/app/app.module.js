"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var storage_1 = require('@ionic/storage');
var app_component_1 = require("./app.component");
var about_1 = require("../pages/about/about");
var contact_1 = require("../pages/contacts/contact");
var dashboard_1 = require("../pages/dashboard/dashboard");
var verification_1 = require("../pages/auth/verification/verification");
var signup_1 = require("../pages/auth/signup/signup");
var devices_1 = require("../pages/devices/devices");
var emergency_1 = require("../pages/emergency/emergency");
var carriers_1 = require("../pages/naloxone-carriers/carriers");
var settings_1 = require("../pages/settings/settings");
var opioid_1 = require("../pages/opioid-tool/opioid");
var setting_edituser_1 = require("../pages/settings/setting-edituser/setting-edituser");
var opioidusers_1 = require("../pages/opioid-users/opioidusers");
var home_1 = require("../pages/home/home");
var start_1 = require("../pages/start/start");
var naloxone_locator_1 = require("../pages/naloxone-locator/naloxone-locator");
var instruction_1 = require('../pages/emergency/instruction/instruction');
var elocator_1 = require('../pages/emergency/locator/elocator');
var timer_1 = require('../pages/emergency/timer/timer');
var request_1 = require('../pages/emergency/request/request');
var shared_1 = require("../shared");
var typeuser_1 = require("../pages/type-user/typeuser");
var add_fromphone_emergency_contact_1 = require("../pages/contacts/add-fromphone-emergency-contact/add-fromphone-emergency-contact");
var add_new_emergency_contact_1 = require("../pages/contacts/add-new-emergency-contact/add-new-emergency-contact");
var ionic_native_1 = require('ionic-native');
var emergency_service_1 = require("../shared/services/emergency.service");
var endscreen_1 = require('../pages/emergency/endscreen/endscreen');
var googleplaces_service_1 = require("../shared/services/googleplaces.service");
var user_settings_service_1 = require("../shared/services/user-settings.service");
var setting_editaddr_1 = require("../pages/settings/setting-editaddr/setting-editaddr");
var comment_1 = require("../pages/emergency/comment/comment");
var TestScreen_1 = require('../pages/TESTING/TestScreen');
var TestComponent_1 = require("../shared/components/TestComponent/TestComponent");
var google_maps_1 = require("@ionic-native/google-maps");
var naloxone_map_1 = require("../shared/components/MapComponents/NaloxoneMapComponent/naloxone-map");
var responders_map_1 = require("../shared/components/MapComponents/RespondersMapComponent/responders-map");
//import { Auth } from '../pages/auth/auth.module';
exports.deepLinkConfig = {
    links: [
        { component: TestScreen_1.TestScreen, name: "testscreen", segment: "testscreen" },
        { component: comment_1.Comment, name: "comment", segment: "comment" },
        { component: add_fromphone_emergency_contact_1.AddFromPhoneEmergencyContact, name: "addfromphoneemergencycontact", segment: "addfromphoneemergencycontact" },
        { component: add_new_emergency_contact_1.AddNewEmergencyContact, name: "addnewemergencycontact", segment: "addnewemergencycontact" },
        { component: typeuser_1.TypeUser, name: "usertype", segment: "usertype" },
        { component: naloxone_locator_1.NaloxoneLocator, name: "naloxonelocator", segment: "naloxonelocator" },
        { component: home_1.Home, name: "home", segment: "home" },
        { component: verification_1.VerificationPage, name: "verificationpage", segment: "verificationpage" },
        { component: signup_1.SignUpPage, name: "signuppage", segment: "signuppage" },
        { component: start_1.Start, name: "start", segment: "start" },
        { component: contact_1.ContactPage, name: "contact", segment: "contact" },
        { component: about_1.AboutPage, name: "about", segment: "about" },
        { component: verification_1.VerificationPage, name: "verification", segment: "verification" },
        { component: signup_1.SignUpPage, name: "signup", segment: "signup" },
        { component: devices_1.Devices, name: "devices", segment: "devices" },
        { component: emergency_1.Emergency, name: "emergency", segment: "emergency" },
        { component: carriers_1.Carriers, name: "carriers", segment: "carriers" },
        { component: settings_1.Settings, name: "settings", segment: "settings" },
        { component: opioid_1.OpioidTool, name: "opioidtool", segment: "opioidtool" },
        { component: opioidusers_1.OpioidUsers, name: "opioidusers", segment: "opioidusers" },
        { component: dashboard_1.Dashboard, name: "dashboard", segment: "dashboard" },
        { component: elocator_1.Elocator, name: "elocator", segment: "elocator" },
        { component: instruction_1.Einstruction, name: "einstruction", segment: "einstruction" },
        { component: endscreen_1.EndScreen, name: "endscreen", segment: "endscreen" },
        { component: timer_1.EmergencyTimer, name: "emergencytimer", segment: "emergencytimer" },
        { component: request_1.EmergencyRequest, name: "emergencyrequest", segment: "emergencyrequest" },
        { component: setting_edituser_1.SettingsEditUser, name: "settingsedituser", segment: "settingsedituser" },
        { component: setting_editaddr_1.SettingsEditAddr, name: "settingseditaddr", segment: "settingseditaddr" },
    ]
};
//need to add naloxonelocator
exports.menuLinks = [
    { label: 'Emergency Contacts', name: 'contact', icon: 'contacts' },
    { label: 'Naloxone Locator', name: 'naloxonelocator', icon: 'map' },
    { label: 'Manage Devices', name: 'devices', icon: 'speedometer' },
    { label: 'User Settings', name: 'settings', icon: 'settings' },
    { label: 'Opioid Quiz', name: 'opioidtool', icon: 'paper' },
    { label: 'Help and Information', name: 'about', icon: 'information-circle' },
    { label: 'TESTING-DASHBOARD', name: 'dashboard', icon: 'heart' },
    { label: 'TEST-SCREEN', name: 'testscreen', icon: 'heart' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                responders_map_1.RespondersMap,
                naloxone_map_1.NaloxoneMap,
                TestComponent_1.TestComponent,
                TestScreen_1.TestScreen,
                comment_1.Comment,
                add_new_emergency_contact_1.AddNewEmergencyContact,
                add_fromphone_emergency_contact_1.AddFromPhoneEmergencyContact,
                typeuser_1.TypeUser,
                naloxone_locator_1.NaloxoneLocator,
                start_1.Start,
                app_component_1.MyApp,
                about_1.AboutPage,
                contact_1.ContactPage,
                verification_1.VerificationPage,
                signup_1.SignUpPage,
                devices_1.Devices,
                emergency_1.Emergency,
                carriers_1.Carriers,
                settings_1.Settings,
                opioid_1.OpioidTool,
                opioidusers_1.OpioidUsers,
                dashboard_1.Dashboard,
                home_1.Home,
                elocator_1.Elocator,
                endscreen_1.EndScreen,
                instruction_1.Einstruction,
                request_1.EmergencyRequest,
                timer_1.EmergencyTimer,
                setting_edituser_1.SettingsEditUser,
                setting_editaddr_1.SettingsEditAddr
            ],
            imports: [
                //Auth,
                storage_1.IonicStorageModule.forRoot(),
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {}, exports.deepLinkConfig)
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                responders_map_1.RespondersMap,
                naloxone_map_1.NaloxoneMap,
                TestComponent_1.TestComponent,
                TestScreen_1.TestScreen,
                comment_1.Comment,
                add_new_emergency_contact_1.AddNewEmergencyContact,
                add_fromphone_emergency_contact_1.AddFromPhoneEmergencyContact,
                typeuser_1.TypeUser,
                naloxone_locator_1.NaloxoneLocator,
                start_1.Start,
                app_component_1.MyApp,
                about_1.AboutPage,
                contact_1.ContactPage,
                dashboard_1.Dashboard,
                verification_1.VerificationPage,
                signup_1.SignUpPage,
                devices_1.Devices,
                emergency_1.Emergency,
                carriers_1.Carriers,
                settings_1.Settings,
                opioid_1.OpioidTool,
                opioidusers_1.OpioidUsers,
                home_1.Home,
                elocator_1.Elocator,
                instruction_1.Einstruction,
                endscreen_1.EndScreen,
                timer_1.EmergencyTimer,
                request_1.EmergencyRequest,
                setting_edituser_1.SettingsEditUser,
                setting_editaddr_1.SettingsEditAddr
            ],
            providers: [
                shared_1.JwtService, shared_1.ApiService, shared_1.UserService, { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
                shared_1.ApiService,
                shared_1.UserService,
                shared_1.JwtService,
                shared_1.DeviceService,
                ionic_native_1.LaunchNavigator,
                emergency_service_1.EmergencyService,
                ionic_native_1.Geolocation,
                googleplaces_service_1.GooglePlaces,
                user_settings_service_1.UserSettingsService,
                google_maps_1.GoogleMaps
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
