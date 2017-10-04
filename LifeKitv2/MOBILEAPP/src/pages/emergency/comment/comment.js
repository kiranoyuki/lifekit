"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Comment = (function () {
    function Comment(er, params, navCtrl) {
        this.er = er;
        this.params = params;
        this.navCtrl = navCtrl;
        this.comment = "";
        this.emergencyId = params.get('emergencyId');
    }
    Comment.prototype.finish = function () {
        var _this = this;
        //send the comment
        this.er.commentEmergency(this.emergencyId, this.comment).subscribe(function (res) {
            alert("Thanks for commenting!");
            _this.navCtrl.popToRoot();
        });
    };
    Comment.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    Comment = __decorate([
        core_1.Component({
            templateUrl: 'comment.html'
        })
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
