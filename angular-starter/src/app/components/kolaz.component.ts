import { kolaz } from '../models/kolaz'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AfterViewInit, Component, Directive, ViewChild, ElementRef, Input } from '@angular/core';
import { KolazService } from '../services/kolaz.service'
import { PictureStatus } from '../models/PictureStatus'

@Component({
    selector: 'my-kolaz',
    templateUrl: "./src/app/components/kolaz.component.html"
})


export class KolazComponent implements AfterViewInit {

    static sizeOfMat: number = 100;
    degel: boolean = false;
    
    @Input()
    listImage: string[];
    @Input()
    arrPicturPointInput: PictureStatus[];
    @Input()
    numOfPicture: number;

    onePicturPoint: PictureStatus;

    image: HTMLImageElement[];
    constructor(private kolazService: KolazService) {
        this.image = new Array<HTMLImageElement>();
        this.listImage = new Array<string>();
        this.arrPicturPointInput = new Array();

        kolazService.backGroundPicture = "1.jpg";

        for (var i = 0; i < kolazService.kolaz.numPictures; i++) {
            this.onePicturPoint = new PictureStatus();
            this.arrPicturPointInput.push(this.onePicturPoint);

        }
    }
    @ViewChild("myCanvas", { read: ElementRef }) tref: ElementRef;

    ngAfterViewInit(): void {

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

    }
    img: HTMLImageElement;

    createinServer() {
        //var theDate: number[] = new Array<number>();
        //theDate = [-0.5, -0.2, -0.1, 0, 0.1, 0.2, 0.5];

        this.kolazService.createKolaze().subscribe(data => {
            this.arrPicturPointInput = data;
            console.log(this.arrPicturPointInput);
            console.log("input arr");
            
               this.tref.nativeElement.getContext("2d").clearRect(0, 0, this.kolazService.kolaz.width, this.kolazService.kolaz.height);
               this.tref.nativeElement.getContext("2d").fillStyle = this.kolazService.color;
               this.tref.nativeElement.getContext("2d").fillRect(0, 0, this.kolazService.kolaz.width, this.kolazService.kolaz.height);
          
     
                 //var pat = this.tref.nativeElement.getContext("2d").createPattern(img, "no-repeat");
               
                 //this.tref.nativeElement.getContext("2d").rect(0, 0, this.kolazService.kolaz.width, this.kolazService.kolaz.height);
                 //this.tref.nativeElement.getContext("2d").fillStyle = pat;
                 //this.tref.nativeElement.getContext("2d").fill();         
                this.img = <HTMLImageElement>(document.getElementById("img"));
          //      this.tref.nativeElement.getContext("2d").drawImage(this.img, 0, 0, this.kolazService.kolaz.height, this.kolazService.kolaz.width);
                 //    let j = this.kolazService.kolaz.numPictures-1;
            let j = this.kolazService.kolaz.numPictures - 1;

            //this.tref.nativeElement.getContext("2d")
            console.log(j);
            while (j >= 0) {
                for (var i = 0; i < this.listImage.length && j >= 0; i++ , j--) {

                    this.image[i] = <HTMLImageElement>(document.getElementById(this.listImage[i]));
                    console.log(this.image[i]);
                    //this.image[i].src = "/src/picture/" + this.listImage[i] + ".jpg";
                    var copy = this.image;
                    var x = this.arrPicturPointInput[j].xPointStart;// + ((this.kolazService.kolaz.space) / 2);
                    var y = this.arrPicturPointInput[j].yPointStart;// + ((this.kolazService.kolaz.space) / 2);
                    var height = this.arrPicturPointInput[j].xPointEnd - this.arrPicturPointInput[j].xPointStart - ((this.kolazService.kolaz.space) / 2);
                    var width = this.arrPicturPointInput[j].yPointEnd - this.arrPicturPointInput[j].yPointStart - ((this.kolazService.kolaz.space) / 2);
                    if (this.kolazService.kolaz.isGrid) {
                        this.tref.nativeElement.getContext("2d").drawImage(this.image[i], x, y, height, width);//(x,y,width,height)
                        this.tref.nativeElement.getContext("2d").lineWidth = this.kolazService.lineWidth;
                        this.tref.nativeElement.getContext("2d").strokeStyle = this.kolazService.colorFrame;//בשביל מסגרת לתמונה
                        this.tref.nativeElement.getContext("2d").strokeRect(x, y, height, width);
                    }
                    else {
                        var widthOfPixel = this.kolazService.kolaz.width / KolazComponent.sizeOfMat;
                        var heightOfPixel = this.kolazService.kolaz.height / KolazComponent.sizeOfMat;

                        //var randomNumber = Math.floor(Math.random() * 7);
                        //    this.tref.nativeElement.getContext("2d").rotate(theDate[randomNumber] * Math.PI / 180);

                        this.tref.nativeElement.getContext("2d").drawImage(this.image[i], x * widthOfPixel, y * heightOfPixel, height * heightOfPixel, width * widthOfPixel);
                        this.tref.nativeElement.getContext("2d").lineWidth = this.kolazService.lineWidth;
                        this.tref.nativeElement.getContext("2d").strokeStyle = this.kolazService.colorFrame;//בשביל מסגרת לתמונה
                        this.tref.nativeElement.getContext("2d").strokeRect(x * widthOfPixel, y * heightOfPixel, height * heightOfPixel, width * widthOfPixel);
                        
                    }
                }

            }
        }
        );

    }

    //export class Canvascomponent implements AfterViewInit {
    //    @ViewChild("myCanv", { read: ElementRef }) tref: ElementRef;

    //    ngAfterViewInit(): void {
    // outputs `I am span`
    //var x = new Image();
    //x.src = "C:\Users\teacher\Pictures\shutterstock_2445740.jpg";
    //x.alt = "hghg";
    //console.log(this.tref.nativeElement.textContent);
    //this.tref.nativeElement.getContext("2d").drawImage(x, 20, 20, 20, 20);
    //this.tref.nativeElement.getContext("2d").fillRect(20, 20, 150, 100);
    //}


    //f() {
    //    var x = new Image();
    //    x.src = "C:\Users\Public\Pictures\Sample Pictures\Desert.jpg";
    //    document.getElementById("cnv").getContext("2d").drawImage(x, 20, 20, 20, 20);
    //    document.getElementById("cnv").("2d").drawImage(x, 100, 100, 50, 50);
    //}

    //}
    //export class SampleComponent implements AfterViewInit {
    //    @ViewChild("tref", { read: ElementRef }) tref: ElementRef;

    //    ngAfterViewInit(): void {
    //        // outputs `I am span`
    //        console.log(this.tref.nativeElement.textContent);
    //    }
    //}




}