import { AfterViewInit, Component, Directive, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { KolazService } from '../services/kolaz.service'
import { UploadFileService } from "../services/uploud.service"
import { OursFile } from "../models/oursFile"

@Component({
    selector: 'my-design',
    templateUrl: "./src/app/components/design.component.html"
})
export class DesignComponent {

    imgeBackground: boolean = false;
    colorBackground: boolean = false;
    transparentBackground: boolean = false;

    file: OursFile = new OursFile();
    constructor(private kolazService: KolazService, private uploadFileService: UploadFileService) {
    }
    @ViewChild("myInputColor", { read: ElementRef }) tref: ElementRef;


    fileChange(event) {
        this.file.file = event.target.files[0];
        let formData: FormData = new FormData();
        formData.append(this.file.toString(), this.file.file, this.file.file.name);
        this.kolazService.backGroundPicture = this.file.file.name;
      
        this.uploadFileService.uploadBackGroundPicture(formData).subscribe(
            success => {
                if (success) {                  
                    //this.currentUpload++;
                    //this.progress = this.currentUpload / this.filesLength * 100;
                    //file.progress = 100;
                    //file.isSuccess = true;
                    //this.degel = true;
                    this.kolazService.degel = true;
                   
                }
                else
                    alert("save faild from success");
            },
            error => {
                console.log(error);
                //alert("save faild!");
            })     
    }   

    changeColorFrame(event)
    {
     this.kolazService.colorFrame = event.target.value;
    } 
    f(event)
    {
        console.log(event)
        this.kolazService.color = event.target.value;      
    }

    onChangeColor() { }
    ngAfterViewInit(): void {
        //this.tref.nativeElement.getContext("2d").drawImage(x, 20, 20, 20, 20);
        //this.color = this.tref.nativeElement.style.color;

        //                          אפשרות שניה           
        //colorPicker.addEventListener("input", updateFirst, false);
        //colorPicker.addEventListener("change", watchColorPicker, false);

        //function watchColorPicker(event) {
        //    document.querySelectorAll("p").forEach(function (p) {
        //        p.style.color = event.target.value;
        //    });
        //}
        //                              אפשרות אחת
        //watchColorPicker(event) {
        //    document.querySelectorAll("p").forEach(function (p) {
        //        p.style.color = event.target.value;
        //    });
        //}

        //colorPicker.addEventListener("change", watchColorPicker, false);
    }

    //@Output()
    //saveColor: EventEmitter<any> = new EventEmitter<any>();

    //saveMyColor() {
    //    this.saveColor.emit(this.color);
    //}   
}