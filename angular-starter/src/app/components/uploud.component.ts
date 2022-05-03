import { Component,Input,Output } from "@angular/core"
import { UploadFileService } from "../services/uploud.service"
import { OursFile } from "../models/oursFile"


@Component
    ({
        selector: 'my-uploud',
        templateUrl: "./src/app/components/uploud.component.html"

    })

export class UploudComponent {

    private isUploadBtn: boolean = true;
    progress: number = 0;
    filesLength: number = 0;
    currentUpload: number = 0;
    oursFileList: OursFile[] = new Array<OursFile>();
    @Output()
    fileList2: string[];
    s: string;
    mone: number=0;
  

    constructor(private uploadFileService: UploadFileService) {
        this.fileList2 = new Array<string>();
    }
    @Input()
    degel: boolean
    debugger;
    //file upload event  
    fileChange(event) {
        let len: number;
        let fileList: FileList = event.target.files;
       
        this.oursFileList[0];
     
        if (fileList.length > 0) {
            this.filesLength = fileList.length;
            //let formData: FormData = new FormData();
            for (var i = 0; i < this.filesLength; i++) {
                let file: OursFile = new OursFile();
                file.file = fileList[i];
                len = this.oursFileList.push(file);
                this.s = fileList[i].name;
                this.fileList2[this.mone] = this.s;
                this.s = fileList[i].name;
                this.uploadSingleFile(file);
                this.mone++;
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
                        this.degel = true;
                        //alert("save success!");
                    }
                    else
                        alert("save faild from success");
                },
                error => {
                    this.currentUpload++;
                    this.progress = this.currentUpload / this.filesLength * 100;
                    file.isError = true;
                    this.degel = false;
                    file.progress = 0;
                    console.log(error);
                    //alert("save faild!");
                }               
            )
        }
    }



    remove(File: OursFile) {
        let index = this.oursFileList.indexOf(File);
        this.oursFileList.splice(index, 1);
    }

    clear() {
        let x: number = this.oursFileList.length;
        for (var i = 0; i < x; i++) {
            this.remove(this.oursFileList[i]);
        }

    }

    flag: boolean = false;
    open() {
        this.flag = true;
    }



    
}