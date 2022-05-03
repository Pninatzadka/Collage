import {Component, Input,Output}from"@angular/core"
import { kolazDetails } from "../models/kolazDetailes"
import { kolaz } from "../models/kolaz"
import { KolazService } from "../services/kolaz.service"
import { Http, RequestOptions, Headers, Response } from '@angular/http';




@Component({
    selector: "my-kolaz-detailes",
    templateUrl: "./src/app/components/kolazDetailes.component.html"

})

export class KolazDetailesComponent
{
    filesLength: number;
    imageKolaz: Object;
    // kolaz: kolaz

    @Input() @Output()
    NumOfPicture: number;


    @Output()
    fShow: boolean = false;

    constructor(private kolazService: KolazService ) {
        //this.kolazDet = new kolaz();
        //this.kolazDet.hight = 233;
        //this.kolazService.kolaz.subscribe(kolaz => this.kolaz = kolaz)
      //  this.kolaz = new kolaz();
        this.kolazService.kolaz.height
    }

     
    fileChange(event) {

        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                
                this.uploadSingleFile(file);
                //formData.append(i.toString(), file, file.name);
            }

        }
    }

    //finishEdit() {
    //    this.kolazService.updateKolage(this.kolaz);
       
    //}

    uploadSingleFile(file: File) {
        let formData: FormData = new FormData();
        formData.append(file.toString(), file, file.name);

        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json');  
        let options = new RequestOptions({ headers: headers });
       
}


   
}
