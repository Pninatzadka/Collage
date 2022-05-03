import { Component, Input, Output, NgModule, OnInit } from "@angular/core"
import { MaterialModule } from "../material.module"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { kolaz } from '../models/kolaz'
import { DrawNewShapeService } from "../services/drawNewShape.service"
import { UploadFileService } from "../services/uploud.service"
import { OursFile } from "../models/oursFile"


import { KolazService } from '../services/kolaz.service'
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PictureStatus } from '../models/PictureStatus'

@Component({
    selector: 'my-start',
    templateUrl: "./src/app/components/start.component.html"
})

export class StartComponent implements OnInit {
    private isUploadBtn: boolean = true;
    degel: boolean = true;

    @Output() @Input()
    numOfPicture: number = 7;

    @Output()
    arrPicturPoint: PictureStatus[];

    onePicturPoint: PictureStatus;
    v: number;

    val: number = 0;

    @Output()
    numOfPicturePoint: number;

    progress: number = 0;
    filesLength: number = 0;
    currentUpload: number = 0;
    oursFileList: OursFile[] = new Array<OursFile>();
    @Output()
    fileList2: string[];
    s: string;
    mone1: number = 0;
    moneShape: number = 0;



    constructor(private kolazService: KolazService, private http: Http, private uploadFileService: UploadFileService, public drawNewShapeService: DrawNewShapeService) {
        this.kolaz1 = new kolaz();
        this.debugger;
        this.arrPicturPoint = new Array();
        this.onePicturPoint = new PictureStatus();

        this.fileList2 = new Array<string>();
        //this.kolazService.updateKolage(this.kolaz);

    }
    @Input()
    degel1: boolean

    debugger;

    @Input()
    degelInput: boolean


    @Output()
    kolaz1: kolaz;

    ngOnInit() {
        this.drawNewShapeService.updateNewShape().subscribe(
            data => {
                //   console.log(component.arrPicturPoint);
                while (this.moneShape < data.length) {
                    this.drawNewShapeService.arrAllShapes.push(data[this.moneShape++]);
                    console.log(data[this.moneShape]);
                }
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
    }
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            let headers = new Headers()
            headers.append('Content-Type', 'json');
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            let apiUrl1 = "/api/UploadFileApi";
            this.http.post(apiUrl1, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                data => console.log('success'),
                error => console.log(error)
                )
        }
        window.location.reload();
    }

    createinServer() {
        if (this.kolazService.kolaz.isGrid == false) { this.kolazService.kolaz.space = 0; }
        var mone: number = -3;
        //const component = this;
        this.kolazService.createKolaze().subscribe(
            data => {
                //   console.log(component.arrPicturPoint);
                this.kolazService.arrPicturPoint = new Array();
                while (mone < data.length) {
                    this.onePicturPoint = new PictureStatus();
                    this.onePicturPoint = data[mone++];
                    this.kolazService.arrPicturPoint.push(this.onePicturPoint);
                    // this.arrPicturPoint.push
                }
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
        this.degel = true;
        //this.kolazService.arrPicturPoint = this.arrPicturPoint;
        console.log(this.kolazService.arrPicturPoint);
        debugger;

    }
    //file upload event  
    fileChange1(event) {       
        let len: number;
        let fileList: FileList = event.target.files;
        this.oursFileList[0];
        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < this.filesLength; i++) {
                let file: OursFile = new OursFile();
                this.numOfPicture = fileList.length;

                file.file = fileList[i];
                len = this.oursFileList.push(file);
                this.s = fileList[i].name;
                this.fileList2[this.mone1] = this.s;
                this.s = fileList[i].name;
                this.uploadSingleFile(file);
                this.mone1++;
                this.kolazService.kolaz.numPictures = this.fileList2.length;
                console.log(this.fileList2.length);
                console.log(this.fileList2);
              //  this.kolazService.kolaz.numPictures = fileList.length;
                //formData.append(i.toString(), file, file.name);
            }
            //formData.append('uploadFile', file, file.name);
            //window.location.reload();
        }
    }

    upload() {
        for (var i = 0; i < this.oursFileList.length; i++) {
            //this.oursFileList[i].progress += 10;
            this.uploadSingleFile(this.oursFileList[i]);
        }
    }
    uploadSingleFile(file: OursFile) {
        if ((!file.isSuccess) && (!file.isError) && (!file.sending)) {
            let formData: FormData = new FormData();
            formData.append(file.toString(), file.file, file.file.name);
            file.progress += 30;
            file.sending = true;

            this.uploadFileService.uploadFiles(formData).subscribe(
                success => {
                    if (success) {
                        this.currentUpload++;
                        this.progress = this.currentUpload / this.filesLength * 100;
                        file.progress = 100;
                        file.isSuccess = true;
                        this.degel1 = true;
                        //alert("save success!");
                    }
                    else
                        alert("save faild from success");
                },
                error => {
                    this.currentUpload++;
                    this.progress = this.currentUpload / this.filesLength * 100;
                    file.isError = true;
                    this.degel1 = false;
                    file.progress = 0;
                    console.log(error);
                    //alert("save faild!");
                }
            )
        }
    }
    deletePicture(File: string) {
        let index = this.fileList2.indexOf(File);
        this.fileList2.splice(index, 1);
        
        this.kolazService.kolaz.numPictures = this.fileList2.length;
        this.mone1--;
        console.log(this.fileList2.length);
        console.log(this.fileList2);
    }
    //clear() {
    //    let x: number = this.oursFileList.length;
    //    for (var i = 0; i < x; i++) {
    //        this.remove(this.oursFileList[i]);
    //    }

    //}

    flag: boolean = false;
    open() {
        this.flag = true;
    }

    clickOne(pic: string, nu: number) {
        //this.isClickPicture = true
        //this.thePictures.ms = nu;
        //this.thePictures.name = pic;
        console.log("נבחרה תמונה");

    }

    //deletePicture() {
    //    this.change.emit();
    //    this.deletPicture.emit(this.fileList2);

    //    if (this.fileList2.length == 1) {
    //        this.fileList2 = new Array(0);

    //    }

    //    else {
    //        for (var r = 0; r < this.fileList2.length - 1; r++) {
    //            this.fileList2[r] = this.fileList2[r + 1];
    //        }
    //        this.fileList2.length--;
    //    }
    //}
}
