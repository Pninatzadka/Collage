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
exports.UploadFileService = void 0;
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
var UploadFileService = /** @class */ (function () {
    function UploadFileService(http) {
        this.http = http;
    }
    UploadFileService.prototype.uploadFiles = function (formData) {
        var apiUrl1 = "/Upload/UploadJsonFile";
        return this.http.post(apiUrl1, formData)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            var errMsg = "post faild";
            if (err instanceof http_1.Response) {
                errMsg = err.status + "==" + err.statusText;
            }
            ;
            return Observable_1.Observable.throw(false);
        });
    };
    UploadFileService.prototype.uploadBackGroundPicture = function (formData) {
        this.imageSource = formData.append.name;
        var apiUrl1 = "/Upload/UploadImage";
        return this.http.post(apiUrl1, formData)
            .map(function (data) {
            console.log(data.url);
            return data.json();
        })
            .catch(function (err) {
            var errMsg = "post faild";
            if (err instanceof http_1.Response) {
                errMsg = err.status + "==" + err.statusText;
            }
            ;
            return Observable_1.Observable.throw(false);
        });
    };
    UploadFileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_2.Http])
    ], UploadFileService);
    return UploadFileService;
}());
exports.UploadFileService = UploadFileService;
//# sourceMappingURL=uploud.service.js.map