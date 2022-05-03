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
exports.DesignComponent = void 0;
var core_1 = require("@angular/core");
var kolaz_service_1 = require("../services/kolaz.service");
var uploud_service_1 = require("../services/uploud.service");
var oursFile_1 = require("../models/oursFile");
var DesignComponent = /** @class */ (function () {
    function DesignComponent(kolazService, uploadFileService) {
        this.kolazService = kolazService;
        this.uploadFileService = uploadFileService;
        this.imgeBackground = false;
        this.colorBackground = false;
        this.transparentBackground = false;
        this.file = new oursFile_1.OursFile();
    }
    DesignComponent.prototype.fileChange = function (event) {
        var _this = this;
        this.file.file = event.target.files[0];
        var formData = new FormData();
        formData.append(this.file.toString(), this.file.file, this.file.file.name);
        this.kolazService.backGroundPicture = this.file.file.name;
        this.uploadFileService.uploadBackGroundPicture(formData).subscribe(function (success) {
            if (success) {
                //this.currentUpload++;
                //this.progress = this.currentUpload / this.filesLength * 100;
                //file.progress = 100;
                //file.isSuccess = true;
                //this.degel = true;
                _this.kolazService.degel = true;
            }
            else
                alert("save faild from success");
        }, function (error) {
            console.log(error);
            //alert("save faild!");
        });
    };
    DesignComponent.prototype.changeColorFrame = function (event) {
        this.kolazService.colorFrame = event.target.value;
    };
    DesignComponent.prototype.f = function (event) {
        console.log(event);
        this.kolazService.color = event.target.value;
    };
    DesignComponent.prototype.onChangeColor = function () { };
    DesignComponent.prototype.ngAfterViewInit = function () {
        //this.tref.nativeElement.getContext("2d").drawImage(x, 20, 20, 20, 20);
        //this.color = this.tref.nativeElement.style.color;
        //                          אפשרות שניה           
        //colorPicker.addEventListener("input", updateFirst, false);
        //colorPicker.addEventListener("change", watchColorPicker, false);
        //function watchColorPicker(event) {
        //    document.querySelectorAll("p").forEach(function (p) {
        //        p.style.color = event.target.value;
        //    });
        //}
        //                              אפשרות אחת
        //watchColorPicker(event) {
        //    document.querySelectorAll("p").forEach(function (p) {
        //        p.style.color = event.target.value;
        //    });
        //}
        //colorPicker.addEventListener("change", watchColorPicker, false);
    };
    __decorate([
        core_1.ViewChild("myInputColor", { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], DesignComponent.prototype, "tref", void 0);
    DesignComponent = __decorate([
        core_1.Component({
            selector: 'my-design',
            templateUrl: "./src/app/components/design.component.html"
        }),
        __metadata("design:paramtypes", [kolaz_service_1.KolazService, uploud_service_1.UploadFileService])
    ], DesignComponent);
    return DesignComponent;
}());
exports.DesignComponent = DesignComponent;
//# sourceMappingURL=design.component.js.map