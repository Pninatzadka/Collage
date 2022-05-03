
import { NgModule } from '@angular/core';
import {
   
    MatSliderModule,
    MatDialogModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatRadioModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule,
        
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        
     
    ],

    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatSelectModule,
        MatDialogModule,
        MatSliderModule,
      
        
    ]
})
export class MaterialModule { }