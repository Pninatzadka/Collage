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
exports.StartComponent = void 0;
var core_1 = require("@angular/core");
var kolaz_1 = require("../models/kolaz");
var drawNewShape_service_1 = require("../services/drawNewShape.service");
var uploud_service_1 = require("../services/uploud.service");
var oursFile_1 = require("../models/oursFile");
var kolaz_service_1 = require("../services/kolaz.service");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var PictureStatus_1 = require("../models/PictureStatus");
var StartComponent = /** @class */ (function () {
    function StartComponent(kolazService, http, uploadFileService, drawNewShapeService) {
        this.kolazService = kolazService;
        this.http = http;
        this.uploadFileService = uploadFileService;
        this.drawNewShapeService = drawNewShapeService;
        this.isUploadBtn = true;
        this.degel = true;
        this.numOfPicture = 7;
        this.val = 0;
        this.progress = 0;
        this.filesLength = 0;
        this.currentUpload = 0;
        this.oursFileList = new Array();
        this.mone1 = 0;
        this.moneShape = 0;
        //clear() {
        //    let x: number = this.oursFileList.length;
        //    for (var i = 0; i < x; i++) {
        //        this.remove(this.oursFileList[i]);
        //    }
        //}
        this.flag = false;
        this.kolaz1 = new kolaz_1.kolaz();
        this.debugger;
        this.arrPicturPoint = new Array();
        this.onePicturPoint = new PictureStatus_1.PictureStatus();
        this.fileList2 = new Array();
        //this.kolazService.updateKolage(this.kolaz);
    }
    StartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drawNewShapeService.updateNewShape().subscribe(function (data) {
            //   console.log(component.arrPicturPoint);
            while (_this.moneShape < data.length) {
                _this.drawNewShapeService.arrAllShapes.push(data[_this.moneShape++]);
                console.log(data[_this.moneShape]);
            }
            if (data) {
                // console.log(<number>data[0].pointEnd);
                console.log(data.values);
                // this.arrPicturPoint[0].xPointEnd = data[0].xPointEnd;
                console.log(data);
                console.log(typeof (data));
            }
            else {
                console.log("נכשל :(");
            }
        }, function (errors) {
            console.log("request failed");
        });
    };
    StartComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'json');
            headers.append('Accept', 'application/json');
            var options = new http_1.RequestOptions({ headers: headers });
            var apiUrl1 = "/api/UploadFileApi";
            this.http.post(apiUrl1, formData, options)
                .map(function (res) { return res.json(); })
                .catch(function (error) { return Rx_1.Observable.throw(error); })
                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
        }
        window.location.reload();
    };
    StartComponent.prototype.createinServer = function () {
        var _this = this;
        if (this.kolazService.kolaz.isGrid == false) {
            this.kolazService.kolaz.space = 0;
        }
        var mone = -3;
        //const component = this;
        this.kolazService.createKolaze().subscribe(function (data) {
            //   console.log(component.arrPicturPoint);
            _this.kolazService.arrPicturPoint = new Array();
            while (mone < data.length) {
                _this.onePicturPoint = new PictureStatus_1.PictureStatus();
                _this.onePicturPoint = data[mone++];
                _this.kolazService.arrPicturPoint.push(_this.onePicturPoint);
                // this.arrPicturPoint.push
            }
            if (data) {
                // console.log(<number>data[0].pointEnd);
                console.log(data.values);
                // this.arrPicturPoint[0].xPointEnd = data[0].xPointEnd;
                console.log(data);
                console.log(typeof (data));
            }
            else {
                console.log("נכשל :(");
            }
        }, function (errors) {
            console.log("request failed");
        });
        this.degel = true;
        //this.kolazService.arrPicturPoint = this.arrPicturPoint;
        console.log(this.kolazService.arrPicturPoint);
        debugger;
    };
    //file upload event  
    StartComponent.prototype.fileChange1 = function (event) {
        var len;
        var fileList = event.target.files;
        this.oursFileList[0];
        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < this.filesLength; i++) {
                var file = new oursFile_1.OursFile();
                this.numOfPicture = fileList.length;
                file.file = fileList[i];
                len = this.oursFileList.push(file);
                this.s = fileList[i].name;
                this.fileList2[this.mone1] = this.s;
                this.s = fileList[i].name;
                this.uploadSingleFile(file);
                this.mone1++;
                this.kolazService.kolaz.numPictures = this.fileList2.length;
                console.log(this.fileList2.length);
                console.log(this.fileList2);
                //  this.kolazService.kolaz.numPictures = fileList.length;
                //formData.append(i.toString(), file, file.name);
            }
            //formData.append('uploadFile', file, file.name);
            //window.location.reload();
        }
    };
    StartComponent.prototype.upload = function () {
        for (var i = 0; i < this.oursFileList.length; i++) {
            //this.oursFileList[i].progress += 10;
            this.uploadSingleFile(this.oursFileList[i]);
        }
    };
    StartComponent.prototype.uploadSingleFile = function (file) {
        var _this = this;
        if ((!file.isSuccess) && (!file.isError) && (!file.sending)) {
            var formData = new FormData();
            formData.append(file.toString(), file.file, file.file.name);
            file.progress += 30;
            file.sending = true;
            this.uploadFileService.uploadFiles(formData).subscribe(function (success) {
                if (success) {
                    _this.currentUpload++;
                    _this.progress = _this.currentUpload / _this.filesLength * 100;
                    file.progress = 100;
                    file.isSuccess = true;
                    _this.degel1 = true;
                    //alert("save success!");
                }
                else
                    alert("save faild from success");
            }, function (error) {
                _this.currentUpload++;
                _this.progress = _this.currentUpload / _this.filesLength * 100;
                file.isError = true;
                _this.degel1 = false;
                file.progress = 0;
                console.log(error);
                //alert("save faild!");
            });
        }
    };
    StartComponent.prototype.deletePicture = function (File) {
        var index = this.fileList2.indexOf(File);
        this.fileList2.splice(index, 1);
        this.kolazService.kolaz.numPictures = this.fileList2.length;
        this.mone1--;
        console.log(this.fileList2.length);
        console.log(this.fileList2);
    };
    StartComponent.prototype.open = function () {
        this.flag = true;
    };
    StartComponent.prototype.clickOne = function (pic, nu) {
        //this.isClickPicture = true
        //this.thePictures.ms = nu;
        //this.thePictures.name = pic;
        console.log("נבחרה תמונה");
    };
    __decorate([
        core_1.Output(),
        core_1.Input(),
        __metadata("design:type", Number)
    ], StartComponent.prototype, "numOfPicture", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Array)
    ], StartComponent.prototype, "arrPicturPoint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Number)
    ], StartComponent.prototype, "numOfPicturePoint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Array)
    ], StartComponent.prototype, "fileList2", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StartComponent.prototype, "degel1", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StartComponent.prototype, "degelInput", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", kolaz_1.kolaz)
    ], StartComponent.prototype, "kolaz1", void 0);
    StartComponent = __decorate([
        core_1.Component({
            selector: 'my-start',
            templateUrl: "./src/app/components/start.component.html"
        }),
        __metadata("design:paramtypes", [kolaz_service_1.KolazService, http_1.Http, uploud_service_1.UploadFileService, drawNewShape_service_1.DrawNewShapeService])
    ], StartComponent);
    return StartComponent;
}());
exports.StartComponent = StartComponent;
//# sourceMappingURL=start.component.js.map