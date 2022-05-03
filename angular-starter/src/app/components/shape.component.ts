import { Component, Input, Output, NgModule } from "@angular/core"

import { MaterialModule } from "../material.module"
import { kolazDetails } from "../models/kolazDetailes"
import { kolaz } from "../models/kolaz"

import { shape } from "../models/shape"
import { KolazService } from "../services/kolaz.service"
import { CanvasComponent } from "./draw.component"
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { DrawNewShapeService } from "../services/drawNewShape.service"

@Component(
    {
        selector: 'my-shape',
        templateUrl:"./src/app/components/shape.component.html"  
})
export class ShapeComponent
{
@Output()
    degel: boolean=false;
// kolaz: kolaz;
    addShapeDegel = false;
    constructor(private kolazService: KolazService, private dialog: MatDialog, public drawNewShapeService: DrawNewShapeService)
    {
        //this.kolazService.kolaz.subscribe(kolaz => this.shape = kolaz);
       // this.kolaz = new kolaz();
    }
    
    isShape: boolean = false;
    grid: boolean = false;
     
    finishEdit() {
        //if (this.grid == true) {
        //    this.kolazService.kolaz.isGrid = true;
        //    this.kolazService.kolaz.shape = "";
        //}
  
        if (this.kolazService.kolaz.shape != null) {
            this.kolazService.kolaz.isGrid = false;
            this.kolazService.kolaz.space = -3;
        }
        else {this.kolazService.kolaz.space =30; }
       
        //this.kolazService.updateKolage(this.kolaz);
    }
    add() {

        this.degel = true;

        let dialogRef = this.dialog.open(CanvasComponent,
            {
                height: '900px', width: '900px',
                disableClose: false,
                //data: { flag: true }
            });
     
        //dialogRef.close('Pizza!');
        //debugger;                
    }
    //dialogRef.afterClosed().subscribe(result => {
    //        console.log(`Dialog result: ${result}`); // Pizza!
    //});
    clean() {
        this.kolazService.kolaz.shape = "";
    }

    
}