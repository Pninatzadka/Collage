import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { kolazDetails } from "../models/kolazDetailes"
import { kolaz } from "../models/kolaz"
import { PictureStatus } from "../models/PictureStatus"
import { Observable } from "rxjs"
import "rxjs/add/operator/map"


@Injectable()
export class KolazService
{
    arrPicturPoint: PictureStatus[];
    onePicturPoint: PictureStatus;
    backGroundPicture: string ;
    color: string;
    degel: boolean=false;
    colorFrame: string;
    x :Object; 
    lineWidth: number;
    kolaz: kolaz
    text: number;
    pont: string;

    constructor(private http: Http) {
        
        this.kolaz = new kolaz();
        console.log(this.kolaz);
        this.kolaz.height = 700;
        this.kolaz.width = 700;
        this.kolaz.space = 30;
        this.color = "#ffffff";
        this.arrPicturPoint = new Array();
        this.colorFrame = "#ffffff";
        this.lineWidth = 0;

        for (var i = 0; i < this.kolaz.numPictures; i++) {
            this.onePicturPoint = new PictureStatus();
            this.arrPicturPoint.push(this.onePicturPoint);

        }
    }
    //updateKolage(kolaz: kolaz) {

    //    Object.keys(kolaz).map(key => {
    //        if (kolaz[key] != null)
    //            this.kolaz[key] = kolaz[key]
    //    });

    //    console.log(this.kolaz);
    //}

    createKolaze(): Observable<PictureStatus[]> 
    {
        let apiUrl1 = "api/Kolaz/";

        if (this.kolaz.isGrid == null && this.kolaz.shape == null)
        {
            this.kolaz.isGrid = true;
        }
        return this.http.post(apiUrl1, this.kolaz).map(data => {
            this.x = data;

            this.arrPicturPoint = new Array();

            for (var i = 0; i < this.kolaz.numPictures; i++) {
                this.onePicturPoint = new PictureStatus();
                this.arrPicturPoint.push(this.onePicturPoint);

            }   
                   
            console.log(data); return data.json();
            
          
        });
    }

}