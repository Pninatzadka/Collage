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
exports.ShapeComponent = void 0;
var core_1 = require("@angular/core");
var kolaz_service_1 = require("../services/kolaz.service");
var draw_component_1 = require("./draw.component");
var material_1 = require("@angular/material");
var drawNewShape_service_1 = require("../services/drawNewShape.service");
var ShapeComponent = /** @class */ (function () {
    function ShapeComponent(kolazService, dialog, drawNewShapeService) {
        this.kolazService = kolazService;
        this.dialog = dialog;
        this.drawNewShapeService = drawNewShapeService;
        this.degel = false;
        // kolaz: kolaz;
        this.addShapeDegel = false;
        this.isShape = false;
        this.grid = false;
        //this.kolazService.kolaz.subscribe(kolaz => this.shape = kolaz);
        // this.kolaz = new kolaz();
    }
    ShapeComponent.prototype.finishEdit = function () {
        //if (this.grid == true) {
        //    this.kolazService.kolaz.isGrid = true;
        //    this.kolazService.kolaz.shape = "";
        //}
        if (this.kolazService.kolaz.shape != null) {
            this.kolazService.kolaz.isGrid = false;
            this.kolazService.kolaz.space = -3;
        }
        else {
            this.kolazService.kolaz.space = 30;
        }
        //this.kolazService.updateKolage(this.kolaz);
    };
    ShapeComponent.prototype.add = function () {
        this.degel = true;
        var dialogRef = this.dialog.open(draw_component_1.CanvasComponent, {
            height: '900px', width: '900px',
            disableClose: false,
            //data: { flag: true }
        });
        //dialogRef.close('Pizza!');
        //debugger;                
    };
    //dialogRef.afterClosed().subscribe(result => {
    //        console.log(`Dialog result: ${result}`); // Pizza!
    //});
    ShapeComponent.prototype.clean = function () {
        this.kolazService.kolaz.shape = "";
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Boolean)
    ], ShapeComponent.prototype, "degel", void 0);
    ShapeComponent = __decorate([
        core_1.Component({
            selector: 'my-shape',
            templateUrl: "./src/app/components/shape.component.html"
        }),
        __metadata("design:paramtypes", [kolaz_service_1.KolazService, material_1.MatDialog, drawNewShape_service_1.DrawNewShapeService])
    ], ShapeComponent);
    return ShapeComponent;
}());
exports.ShapeComponent = ShapeComponent;
//# sourceMappingURL=shape.component.js.map