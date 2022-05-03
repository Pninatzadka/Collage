import { RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from "@angular/core"

import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/operator/toPromise"



@Injectable()
export class UploadFileService {
    imageSource: string;

    constructor(private http: Http) {

    }
    uploadFiles(formData: FormData): Observable<boolean> {
        let apiUrl1 = "/Upload/UploadJsonFile";
        return this.http.post(apiUrl1, formData)
            .map(data => { return data.json() as boolean; })
            .catch(err => {
                var errMsg = "post faild";
                if (err instanceof Response) {
                    errMsg = err.status + "==" + err.statusText;
                };
                return Observable.throw(false);
            }
            );
    }

    uploadBackGroundPicture(formData: FormData): Observable<boolean>
    {
        this.imageSource = formData.append.name;
       
        let apiUrl1 = "/Upload/UploadImage";
        return this.http.post(apiUrl1, formData)
            .map(data => {
                console.log( data.url);
             return data.json() as boolean; })
            .catch(err => {
                var errMsg = "post faild";
                if (err instanceof Response) {
                    errMsg = err.status + "==" + err.statusText;
                };
                return Observable.throw(false);
            }
            );
    
    }


}