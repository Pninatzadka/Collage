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
exports.PictureComponent = void 0;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/takeUntil");
require("rxjs/add/operator/pairwise");
require("rxjs/add/operator/switchMap");
var PictureComponent = /** @class */ (function () {
    function PictureComponent() {
        this.width = 400;
        this.height = 400;
    }
    PictureComponent.prototype.ngAfterViewInit = function () {
        var canvasEl = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.cx.lineWidth = 3;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';
        this.captureEvents(canvasEl);
    };
    PictureComponent.prototype.downloadCanvas = function (event) {
        // get the `<a>` element from click event
        var anchor = event.target;
        // get the canvas, I'm getting it by tag name, you can do by id
        // and set the href of the anchor to the canvas dataUrl
        anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
        // set the anchors 'download' attibute (name of the file to be downloaded)
        anchor.download = "test.png";
        anchor.save();
    };
    PictureComponent.prototype.captureEvents = function (canvasEl) {
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
    PictureComponent.prototype.drawOnCanvas = function (prevPos, currentPos) {
        if (!this.cx) {
            return;
        }
        this.cx.beginPath();
        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.stroke();
        }
    };
    __decorate([
        core_1.ViewChild('canvas'),
        __metadata("design:type", core_1.ElementRef)
    ], PictureComponent.prototype, "canvas", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PictureComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PictureComponent.prototype, "height", void 0);
    PictureComponent = __decorate([
        core_1.Component({
            selector: 'my-picture',
            template: '<canvas #canvas id="cc"></canvas>  <a href="#" (click)="downloadCanvas($event)"> DOWNLOAD THIS</a>',
            styles: ['canvas { border: 1px solid #000; }']
        })
    ], PictureComponent);
    return PictureComponent;
}());
exports.PictureComponent = PictureComponent;
//# sourceMappingURL=picture.component.js.map