import {
    Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-picture',
    template: '<canvas #canvas id="cc"></canvas>  <a href="#" (click)="downloadCanvas($event)"> DOWNLOAD THIS</a>',
    styles: ['canvas { border: 1px solid #000; }']
})


export class PictureComponent implements AfterViewInit {

   



    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 400;
    @Input() public height = 400;

    private cx: CanvasRenderingContext2D;

    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.cx.lineWidth = 3;
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = '#000';
     
        this.captureEvents(canvasEl);
    }
    downloadCanvas(event: any) {
        // get the `<a>` element from click event
        var anchor = event.target;
        // get the canvas, I'm getting it by tag name, you can do by id
        // and set the href of the anchor to the canvas dataUrl
        anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
        // set the anchors 'download' attibute (name of the file to be downloaded)
        anchor.download = "test.png";
        anchor.save();
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

    private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
        if (!this.cx) { return; }

        this.cx.beginPath();

        if (prevPos) {
            this.cx.moveTo(prevPos.x, prevPos.y); // from
            this.cx.lineTo(currentPos.x, currentPos.y);
            this.cx.stroke();
        }
    }

}

    

