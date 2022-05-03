import { Component, Input,Output, ElementRef, AfterViewInit, ViewChild, Inject
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';
import { DrawNewShapeService } from "../services/drawNewShape.service"
import { KolazService } from "../services/kolaz.service"
@Component({
    selector: 'app-canvas',
    templateUrl:"./src/app/components/draw.component.html"
  
})
export class CanvasComponent implements AfterViewInit {
   

    constructor(
        private matDialogRef: MatDialogRef<CanvasComponent>
        ,@Inject(MAT_DIALOG_DATA) public data: any
        , public drawNewShapeService: DrawNewShapeService,
        public kolazService: KolazService
    ) {
        this.degelInput = true;
    }

    cancel() {
        this.matDialogRef.close(null);
    }


    @Input()
    degelInput: boolean;

    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 700;
    @Input() public height = 700;

    @Input() @Output()
    textCanvas: string;

    strokeStyle: string;

    mone: number = 0;
    @Input() @Output ()
    lineWidth: number;
    private cx: CanvasRenderingContext2D;

    public ngAfterViewInit() {
      
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.cx.lineWidth = 50;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';

        this.captureEvents(canvasEl);
    }

    private captureEvents(canvasEl: HTMLCanvasElement) {
        Observable
            .fromEvent(canvasEl, 'mousedown')
            .switchMap((e) => {
                return Observable
                    .fromEvent(canvasEl, 'mousemove')
                    .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
                    .pairwise()
            })
            .subscribe((res: [MouseEvent, MouseEvent]) => {
                const rect = canvasEl.getBoundingClientRect();

                const prevPos = {
                    x: res[0].clientX - rect.left,
                    y: res[0].clientY - rect.top
                };

                const currentPos = {
                    x: res[1].clientX - rect.left,
                    y: res[1].clientY - rect.top
                };

                this.drawOnCanvas(prevPos, currentPos);
               
            });
    }
    ok()
    {
        this.cx.clearRect(0, 0, 700, 700);
        this.canvas.nativeElement.getContext("2d").font = '900 500px ' + this.kolazService.pont;
        this.canvas.nativeElement.getContext("2d").fillText(this.textCanvas,50, 450,650);
    }
    private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
       
        this.cx.lineWidth = this.lineWidth;
        this.cx.strokeStyle = this.strokeStyle;
        if (!this.cx) { return; }
        
        this.cx.beginPath();

        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.strokeRect;
            this.cx.stroke();
            
        }
    }


    downloadCanvas(event: any) {

        // get the `<a>` element from click event
        var anchor = event.target;
        // get the canvas, I'm getting it by tag name, you can do by id
        // and set the href of the anchor to the canvas dataUrl
        anchor.href = document.getElementsByTagName('canvas')[0].toDataURL("M:/זוגות/רותי ופניני/סידור הקוד/shape/");
        // set the anchors 'download' attibute (name of the file to be downloaded)
       
        anchor.downloadcanvas = "pniniharari.jpg";
        anchor.save();


        this.save();
    }
     delete() {
        this.strokeStyle = '#ffffff';
    }
     brush() {
         this.strokeStyle = '#000';
     }

    

     save() {
        this.degelInput = false;
        this.mone = 0;

        this.drawNewShapeService.updateNewShape().subscribe(
            data => {
                //  console.log(component.arrPicturPoint);
                this.drawNewShapeService.arrAllShapes = new Array<string>();
                console.log(data);
                while (this.mone < data.length) {
                    console.log(this.mone);
                    this.drawNewShapeService.arrAllShapes.push(data[this.mone++]);
                }
                console.log(this.drawNewShapeService.arrAllShapes);
                if (data) {
                    // console.log(<number>data[0].pointEnd);
                    console.log(data.values)
                    // this.arrPicturPoint[0].xPointEnd = data[0].xPointEnd;
                    console.log(data);
                    console.log(typeof (data));
                }
                else {
                    console.log("נכשל :(");
                }
            },
            errors => {
                console.log("request failed");
            }
        );
        this.matDialogRef.close(null);
        

    }

    clear() {
        this.cx.clearRect(0, 0, 700, 700);

    }


}