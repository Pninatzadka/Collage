"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KolazService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var kolaz_1 = require("../models/kolaz");
var PictureStatus_1 = require("../models/PictureStatus");
require("rxjs/add/operator/map");
var KolazService = /** @class */ (function () {
    function KolazService(http) {
        this.http = http;
        this.degel = false;
        this.kolaz = new kolaz_1.kolaz();
        console.log(this.kolaz);
        this.kolaz.height = 700;
        this.kolaz.width = 700;
        this.kolaz.space = 30;
        this.color = "#ffffff";
        this.arrPicturPoint = new Array();
        this.colorFrame = "#ffffff";
        this.lineWidth = 0;
        for (var i = 0; i < this.kolaz.numPictures; i++) {
            this.onePicturPoint = new PictureStatus_1.PictureStatus();
            this.arrPicturPoint.push(this.onePicturPoint);
        }
    }
    //updateKolage(kolaz: kolaz) {
    //    Object.keys(kolaz).map(key => {
    //        if (kolaz[key] != null)
    //            this.kolaz[key] = kolaz[key]
    //    });
    //    console.log(this.kolaz);
    //}
    KolazService.prototype.createKolaze = function () {
        var _this = this;
        var apiUrl1 = "api/Kolaz/";
        if (this.kolaz.isGrid == null && this.kolaz.shape == null) {
            this.kolaz.isGrid = true;
        }
        return this.http.post(apiUrl1, this.kolaz).map(function (data) {
            _this.x = data;
            _this.arrPicturPoint = new Array();
            for (var i = 0; i < _this.kolaz.numPictures; i++) {
                _this.onePicturPoint = new PictureStatus_1.PictureStatus();
                _this.arrPicturPoint.push(_this.onePicturPoint);
            }
            console.log(data);
            return data.json();
        });
    };
    KolazService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], KolazService);
    return KolazService;
}());
exports.KolazService = KolazService;
//# sourceMappingURL=kolaz.service.js.map