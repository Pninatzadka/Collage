import { Component, Output } from "@angular/core"



@Component(
    {
        selector: "my-app",
        templateUrl:"./src/app/app.component.html"
        

})
export class AppComponent 
{
    constructor() { }

    @Output()
    degel: boolean = false


    openDetail()
    {
 
        this.degel = true;
    }
    
}
