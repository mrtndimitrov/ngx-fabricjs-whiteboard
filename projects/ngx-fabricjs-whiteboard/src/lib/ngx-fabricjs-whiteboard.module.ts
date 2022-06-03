import { NgModule } from '@angular/core';
import { NgxFabricjsWhiteboardComponent } from './ngx-fabricjs-whiteboard.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NgxFabricjsWhiteboardComponent
  ],
  imports: [
    MatButtonModule
  ],
  exports: [
    NgxFabricjsWhiteboardComponent
  ]
})
export class NgxFabricjsWhiteboardModule { }
