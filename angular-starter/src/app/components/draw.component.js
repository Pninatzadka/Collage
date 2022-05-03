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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasComponent = void 0;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var material_1 = require("@angular/material");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/takeUntil");
require("rxjs/add/operator/pairwise");
require("rxjs/add/operator/switchMap");
var drawNewShape_service_1 = require("../services/drawNewShape.service");
var kolaz_service_1 = require("../services/kolaz.service");
var CanvasComponent = /** @class */ (function () {
    function CanvasComponent(matDialogRef, data, drawNewShapeService, kolazService) {
        this.matDialogRef = matDialogRef;
        this.data = data;
        this.drawNewShapeService = drawNewShapeService;
        this.kolazService = kolazService;
        this.width = 700;
        this.height = 700;
        this.mone = 0;
        this.degelInput = true;
    }
    CanvasComponent.prototype.cancel = function () {
        this.matDialogRef.close(null);
    };
    CanvasComponent.prototype.ngAfterViewInit = function () {
        var canvasEl = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.cx.lineWidth = 50;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';
        this.captureEvents(canvasEl);
    };
    CanvasComponent.prototype.captureEvents = function (canvasEl) {
        var _this = this;
        Observable_1.Observable
            .fromEvent(canvasEl, 'mousedown')
            .switchMap(function (e) {
            return Observable_1.Observable
                .fromEvent(canvasEl, 'mousemove')
                .takeUntil(Observable_1.Observable.fromEvent(canvasEl, 'mouseup'))
                .pairwise();
        })
            .subscribe(function (res) {
            var rect = canvasEl.getBoundingClientRect();
            var prevPos = {
                x: res[0].clientX - rect.left,
                y: res[0].clientY - rect.top
            };
            var currentPos = {
                x: res[1].clientX - rect.left,
                y: res[1].clientY - rect.top
            };
            _this.drawOnCanvas(prevPos, currentPos);
        });
    };
    CanvasComponent.prototype.ok = function () {
        this.cx.clearRect(0, 0, 700, 700);
        this.canvas.nativeElement.getContext("2d").font = '900 500px ' + this.kolazService.pont;
        this.canvas.nativeElement.getContext("2d").fillText(this.textCanvas, 50, 450, 650);
    };
    CanvasComponent.prototype.drawOnCanvas = function (prevPos, currentPos) {
        this.cx.lineWidth = this.lineWidth;
        this.cx.strokeStyle = this.strokeStyle;
        if (!this.cx) {
            return;
        }
        this.cx.beginPath();
        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.strokeRect;
            this.cx.stroke();
        }
    };
    CanvasComponent.prototype.downloadCanvas = function (event) {
        // get the `<a>` element from click event
        var anchor = event.target;
        // get the canvas, I'm getting it by tag name, you can do by id
        // and set the href of the anchor to the canvas dataUrl
        anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("M:/זוגות/רותי ופניני/סידור הקוד/shape/");
        // set the anchors 'download' attibute (name of the file to be downloaded)
        anchor.downloadcanvas = "pniniharari.jpg";
        anchor.save();
        this.save();
    };
    CanvasComponent.prototype.delete = function () {
        this.strokeStyle = '#ffffff';
    };
    CanvasComponent.prototype.brush = function () {
        this.strokeStyle = '#000';
    };
    CanvasComponent.prototype.save = function () {
        var _this = this;
        this.degelInput = false;
        this.mone = 0;
        this.drawNewShapeService.updateNewShape().subscribe(function (data) {
            //  console.log(component.arrPicturPoint);
            _this.drawNewShapeService.arrAllShapes = new Array();
            console.log(data);
            while (_this.mone < data.length) {
                console.log(_this.mone);
                _this.drawNewShapeService.arrAllShapes.push(data[_this.mone++]);
            }
            console.log(_this.drawNewShapeService.arrAllShapes);
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
        this.matDialogRef.close(null);
    };
    CanvasComponent.prototype.clear = function () {
        this.cx.clearRect(0, 0, 700, 700);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CanvasComponent.prototype, "degelInput", void 0);
    __decorate([
        core_1.ViewChild('canvas'),
        __metadata("design:type", core_1.ElementRef)
    ], CanvasComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CanvasComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CanvasComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        core_1.Output(),
        __metadata("design:type", String)
    ], CanvasComponent.prototype, "textCanvas", void 0);
    __decorate([
        core_1.Input(),
        core_1.Output(),
        __metadata("design:type", Number)
    ], CanvasComponent.prototype, "lineWidth", void 0);
    CanvasComponent = __decorate([
        core_1.Component({
            selector: 'app-canvas',
            templateUrl: "./src/app/components/draw.component.html"
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, drawNewShape_service_1.DrawNewShapeService,
            kolaz_service_1.KolazService])
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
//# sourceMappingURL=draw.component.js.map