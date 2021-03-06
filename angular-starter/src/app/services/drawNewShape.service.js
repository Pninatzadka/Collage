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
exports.DrawNewShapeService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var DrawNewShapeService = /** @class */ (function () {
    function DrawNewShapeService(http) {
        this.http = http;
        this.arrAllShapes = new Array();
    }
    DrawNewShapeService.prototype.updateNewShape = function () {
        var _this = this;
        return this.http.get("api/newShape/").map(function (data) {
            // this.arrShapes = data;
            console.log(_this.arrShapes);
            console.log(data);
            return data.json();
        });
    };
    DrawNewShapeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DrawNewShapeService);
    return DrawNewShapeService;
}());
exports.DrawNewShapeService = DrawNewShapeService;
//# sourceMappingURL=drawNewShape.service.js.map