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
exports.KolazDetailesComponent = void 0;
var core_1 = require("@angular/core");
var kolaz_service_1 = require("../services/kolaz.service");
var http_1 = require("@angular/http");
var KolazDetailesComponent = /** @class */ (function () {
    function KolazDetailesComponent(kolazService) {
        this.kolazService = kolazService;
        this.fShow = false;
        //this.kolazDet = new kolaz();
        //this.kolazDet.hight = 233;
        //this.kolazService.kolaz.subscribe(kolaz => this.kolaz = kolaz)
        //  this.kolaz = new kolaz();
        this.kolazService.kolaz.height;
    }
    KolazDetailesComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                this.uploadSingleFile(file);
                //formData.append(i.toString(), file, file.name);
            }
        }
    };
    //finishEdit() {
    //    this.kolazService.updateKolage(this.kolaz);
    //}
    KolazDetailesComponent.prototype.uploadSingleFile = function (file) {
        var formData = new FormData();
        formData.append(file.toString(), file, file.name);
        var headers = new http_1.Headers();
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json');  
        var options = new http_1.RequestOptions({ headers: headers });
    };
    __decorate([
        core_1.Input(),
        core_1.Output(),
        __metadata("design:type", Number)
    ], KolazDetailesComponent.prototype, "NumOfPicture", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Boolean)
    ], KolazDetailesComponent.prototype, "fShow", void 0);
    KolazDetailesComponent = __decorate([
        core_1.Component({
            selector: "my-kolaz-detailes",
            templateUrl: "./src/app/components/kolazDetailes.component.html"
        }),
        __metadata("design:paramtypes", [kolaz_service_1.KolazService])
    ], KolazDetailesComponent);
    return KolazDetailesComponent;
}());
exports.KolazDetailesComponent = KolazDetailesComponent;
//# sourceMappingURL=kolazDetailes.component.js.map