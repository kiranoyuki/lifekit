"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var app_module_1 = require("../../app/app.module");
var typeuser_1 = require("../type-user/typeuser");
//need to add naloxonelocator
var Home = (function () {
    function Home(app, platform, ref) {
        this.app = app;
        this.platform = platform;
        this.ref = ref;
        this.menu = app_module_1.menuLinks;
        this.rootPage = typeuser_1.TypeUser;
        app._setDisableScroll(true);
    }
    Home.prototype.open = function (url) {
        this.navCtrl.push(url);
    };
    __decorate([
        core_1.ViewChild('myNav')
    ], Home.prototype, "navCtrl", void 0);
    Home = __decorate([
        core_1.Component({
            templateUrl: 'home.html'
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
