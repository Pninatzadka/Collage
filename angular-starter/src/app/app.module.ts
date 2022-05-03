import {NgModule}from "@angular/core"
import {AppComponent}from "./app.component"
import { FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserModule} from '@angular/platform-browser'
import { KolazDetailesComponent } from "./components/kolazDetailes.component"
import { MaterialModule } from "./material.module"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http'
import { KolazService } from "./services/kolaz.service"
import { StartComponent } from "../app/components/start.component"
import { Routes, RouterModule } from "@angular/router"
import { ShapeComponent } from "./components/shape.component"
import { DesignComponent } from "./components/design.component"
import { KolazComponent } from "./components/kolaz.component"
import { UploudComponent } from "./components/uploud.component"
import { UploadFileService } from "./services/uploud.service"
import { PictureComponent } from "./components/picture.component"
import { CanvasComponent } from "./components/draw.component"
import { DrawNewShapeService } from "./services/drawNewShape.service"
import { MatDialogModule, MatDialogRef } from '@angular/material';


const Router: Routes = [
    { path: "kolazDetailes", component: KolazDetailesComponent },
    { path: "shape", component: ShapeComponent },
    { path: "design", component: DesignComponent },



]

@NgModule({
    imports: [BrowserModule, FormsModule, MaterialModule, BrowserAnimationsModule, HttpModule, RouterModule.forRoot(Router), ReactiveFormsModule],//all modul that need
    entryComponents: [CanvasComponent ],
    declarations: [CanvasComponent, PictureComponent, UploudComponent, KolazComponent, AppComponent, KolazDetailesComponent, StartComponent, ShapeComponent, DesignComponent],//all the component that need
    bootstrap: [AppComponent],//the first component
    providers: [DrawNewShapeService,KolazService, UploadFileService,]//all the service
        
    
})



export class AppModule
{
    constructor() { }
}