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
exports.KolazComponent = void 0;
var core_1 = require("@angular/core");
var kolaz_service_1 = require("../services/kolaz.service");
var PictureStatus_1 = require("../models/PictureStatus");
var KolazComponent = /** @class */ (function () {
    function KolazComponent(kolazService) {
        this.kolazService = kolazService;
        this.degel = false;
        this.image = new Array();
        this.listImage = new Array();
        this.arrPicturPointInput = new Array();
        kolazService.backGroundPicture = "1.jpg";
        for (var i = 0; i < kolazService.kolaz.numPictures; i++) {
            this.onePicturPoint = new PictureStatus_1.PictureStatus();
            this.arrPicturPointInput.push(this.onePicturPoint);
        }
    }
    KolazComponent_1 = KolazComponent;
    KolazComponent.prototype.ngAfterViewInit = function () {
        //  this.x[1] = <HTMLImageElement>(document.getElementById("scream")); 
        //this.x.width = 80;
        //this.x.height = 60;
        //this.x.alt  = "/src/picture/Tulips.jpg";
        //this.x.src = "/src/picture/Tulips.jpg";
        ////   x.src = "C:\Users\Public\Pictures\Sample Pictures\Tulips.jpg";
        //// x.src = "C:/Users/Public/Pictures/Sample Pictures/Tulips.jpg";
        //this.x.alt = "hghg";
        // this.tref.nativeElement.getContext("2d").drawImage(this.x, 0, 0, 20, 20);
        // לקבל רשימה של מיקומים ולצייר ריבועים במיקום זה
        //  this.tref.nativeElement.getContext("2d").fillRect(20, 20, 20, 20);
    };
    KolazComponent.prototype.createinServer = function () {
        //var theDate: number[] = new Array<number>();
        //theDate = [-0.5, -0.2, -0.1, 0, 0.1, 0.2, 0.5];
        var _this = this;
        this.kolazService.createKolaze().subscribe(function (data) {
            _this.arrPicturPointInput = data;
            console.log(_this.arrPicturPointInput);
            console.log("input arr");
            _this.tref.nativeElement.getContext("2d").clearRect(0, 0, _this.kolazService.kolaz.width, _this.kolazService.kolaz.height);
            _this.tref.nativeElement.getContext("2d").fillStyle = _this.kolazService.color;
            _this.tref.nativeElement.getContext("2d").fillRect(0, 0, _this.kolazService.kolaz.width, _this.kolazService.kolaz.height);
            //var pat = this.tref.nativeElement.getContext("2d").createPattern(img, "no-repeat");
            //this.tref.nativeElement.getContext("2d").rect(0, 0, this.kolazService.kolaz.width, this.kolazService.kolaz.height);
            //this.tref.nativeElement.getContext("2d").fillStyle = pat;
            //this.tref.nativeElement.getContext("2d").fill();         
            _this.img = (document.getElementById("img"));
            //      this.tref.nativeElement.getContext("2d").drawImage(this.img, 0, 0, this.kolazService.kolaz.height, this.kolazService.kolaz.width);
            //    let j = this.kolazService.kolaz.numPictures-1;
            var j = _this.kolazService.kolaz.numPictures - 1;
            //this.tref.nativeElement.getContext("2d")
            console.log(j);
            while (j >= 0) {
                for (var i = 0; i < _this.listImage.length && j >= 0; i++, j--) {
                    _this.image[i] = (document.getElementById(_this.listImage[i]));
                    console.log(_this.image[i]);
                    //this.image[i].src = "/src/picture/" + this.listImage[i] + ".jpg";
                    var copy = _this.image;
                    var x = _this.arrPicturPointInput[j].xPointStart; // + ((this.kolazService.kolaz.space) / 2);
                    var y = _this.arrPicturPointInput[j].yPointStart; // + ((this.kolazService.kolaz.space) / 2);
                    var height = _this.arrPicturPointInput[j].xPointEnd - _this.arrPicturPointInput[j].xPointStart - ((_this.kolazService.kolaz.space) / 2);
                    var width = _this.arrPicturPointInput[j].yPointEnd - _this.arrPicturPointInput[j].yPointStart - ((_this.kolazService.kolaz.space) / 2);
                    if (_this.kolazService.kolaz.isGrid) {
                        _this.tref.nativeElement.getContext("2d").drawImage(_this.image[i], x, y, height, width); //(x,y,width,height)
                        _this.tref.nativeElement.getContext("2d").lineWidth = _this.kolazService.lineWidth;
                        _this.tref.nativeElement.getContext("2d").strokeStyle = _this.kolazService.colorFrame; //בשביל מסגרת לתמונה
                        _this.tref.nativeElement.getContext("2d").strokeRect(x, y, height, width);
                    }
                    else {
                        var widthOfPixel = _this.kolazService.kolaz.width / KolazComponent_1.sizeOfMat;
                        var heightOfPixel = _this.kolazService.kolaz.height / KolazComponent_1.sizeOfMat;
                        //var randomNumber = Math.floor(Math.random() * 7);
                        //    this.tref.nativeElement.getContext("2d").rotate(theDate[randomNumber] * Math.PI / 180);
                        _this.tref.nativeElement.getContext("2d").drawImage(_this.image[i], x * widthOfPixel, y * heightOfPixel, height * heightOfPixel, width * widthOfPixel);
                        _this.tref.nativeElement.getContext("2d").lineWidth = _this.kolazService.lineWidth;
                        _this.tref.nativeElement.getContext("2d").strokeStyle = _this.kolazService.colorFrame; //בשביל מסגרת לתמונה
                        _this.tref.nativeElement.getContext("2d").strokeRect(x * widthOfPixel, y * heightOfPixel, height * heightOfPixel, width * widthOfPixel);
                    }
                }
            }
        });
    };
    var KolazComponent_1;
    KolazComponent.sizeOfMat = 100;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], KolazComponent.prototype, "listImage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], KolazComponent.prototype, "arrPicturPointInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], KolazComponent.prototype, "numOfPicture", void 0);
    __decorate([
        core_1.ViewChild("myCanvas", { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], KolazComponent.prototype, "tref", void 0);
    KolazComponent = KolazComponent_1 = __decorate([
        core_1.Component({
            selector: 'my-kolaz',
            templateUrl: "./src/app/components/kolaz.component.html"
        }),
        __metadata("design:paramtypes", [kolaz_service_1.KolazService])
    ], KolazComponent);
    return KolazComponent;
}());
exports.KolazComponent = KolazComponent;
//# sourceMappingURL=kolaz.component.js.map