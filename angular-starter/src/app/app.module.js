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
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var kolazDetailes_component_1 = require("./components/kolazDetailes.component");
var material_module_1 = require("./material.module");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var kolaz_service_1 = require("./services/kolaz.service");
var start_component_1 = require("../app/components/start.component");
var router_1 = require("@angular/router");
var shape_component_1 = require("./components/shape.component");
var design_component_1 = require("./components/design.component");
var kolaz_component_1 = require("./components/kolaz.component");
var uploud_component_1 = require("./components/uploud.component");
var uploud_service_1 = require("./services/uploud.service");
var picture_component_1 = require("./components/picture.component");
var draw_component_1 = require("./components/draw.component");
var drawNewShape_service_1 = require("./services/drawNewShape.service");
var Router = [
    { path: "kolazDetailes", component: kolazDetailes_component_1.KolazDetailesComponent },
    { path: "shape", component: shape_component_1.ShapeComponent },
    { path: "design", component: design_component_1.DesignComponent },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, material_module_1.MaterialModule, animations_1.BrowserAnimationsModule, http_1.HttpModule, router_1.RouterModule.forRoot(Router), forms_1.ReactiveFormsModule],
            entryComponents: [draw_component_1.CanvasComponent],
            declarations: [draw_component_1.CanvasComponent, picture_component_1.PictureComponent, uploud_component_1.UploudComponent, kolaz_component_1.KolazComponent, app_component_1.AppComponent, kolazDetailes_component_1.KolazDetailesComponent, start_component_1.StartComponent, shape_component_1.ShapeComponent, design_component_1.DesignComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [drawNewShape_service_1.DrawNewShapeService, kolaz_service_1.KolazService, uploud_service_1.UploadFileService,] //all the service
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map