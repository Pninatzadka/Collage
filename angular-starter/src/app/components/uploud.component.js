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
exports.UploudComponent = void 0;
var core_1 = require("@angular/core");
var uploud_service_1 = require("../services/uploud.service");
var oursFile_1 = require("../models/oursFile");
var UploudComponent = /** @class */ (function () {
    function UploudComponent(uploadFileService) {
        this.uploadFileService = uploadFileService;
        this.isUploadBtn = true;
        this.progress = 0;
        this.filesLength = 0;
        this.currentUpload = 0;
        this.oursFileList = new Array();
        this.mone = 0;
        this.flag = false;
        this.fileList2 = new Array();
    }
    //file upload event  
    UploudComponent.prototype.fileChange = function (event) {
        var len;
        var fileList = event.target.files;
        this.oursFileList[0];
        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < this.filesLength; i++) {
                var file = new oursFile_1.OursFile();
                file.file = fileList[i];
                len = this.oursFileList.push(file);
                this.s = fileList[i].name;
                this.fileList2[this.mone] = this.s;
                this.s = fileList[i].name;
                this.uploadSingleFile(file);
                this.mone++;
                //formData.append(i.toString(), file, file.name);
            }
            //formData.append('uploadFile', file, file.name);
            //window.location.reload();
        }
    };
    UploudComponent.prototype.upload = function () {
        for (var i = 0; i < this.oursFileList.length; i++) {
            //this.oursFileList[i].progress += 10;
            this.uploadSingleFile(this.oursFileList[i]);
        }
    };
    UploudComponent.prototype.uploadSingleFile = function (file) {
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
                    _this.degel = true;
                    //alert("save success!");
                }
                else
                    alert("save faild from success");
            }, function (error) {
                _this.currentUpload++;
                _this.progress = _this.currentUpload / _this.filesLength * 100;
                file.isError = true;
                _this.degel = false;
                file.progress = 0;
                console.log(error);
                //alert("save faild!");
            });
        }
    };
    UploudComponent.prototype.remove = function (File) {
        var index = this.oursFileList.indexOf(File);
        this.oursFileList.splice(index, 1);
    };
    UploudComponent.prototype.clear = function () {
        var x = this.oursFileList.length;
        for (var i = 0; i < x; i++) {
            this.remove(this.oursFileList[i]);
        }
    };
    UploudComponent.prototype.open = function () {
        this.flag = true;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Array)
    ], UploudComponent.prototype, "fileList2", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UploudComponent.prototype, "degel", void 0);
    UploudComponent = __decorate([
        core_1.Component({
            selector: 'my-uploud',
            templateUrl: "./src/app/components/uploud.component.html"
        }),
        __metadata("design:paramtypes", [uploud_service_1.UploadFileService])
    ], UploudComponent);
    return UploudComponent;
}());
exports.UploudComponent = UploudComponent;
//# sourceMappingURL=uploud.component.js.map