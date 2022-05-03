import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { Observable } from "rxjs"


@Injectable()
export class DrawNewShapeService {
    arrShapes: Object
    arrAllShapes: string[];
    nameShape: string;

    constructor(private http: Http) {
        this.arrAllShapes = new Array<string>();
    }

    updateNewShape(): Observable<string[]> {
        return this.http.get("api/newShape/").map(data => {
            // this.arrShapes = data;

            console.log(this.arrShapes);
            console.log(data);

            return data.json() as string[];
        });
    }
}
