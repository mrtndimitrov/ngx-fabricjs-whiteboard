import { NgModule } from '@angular/core';
import { NgxFabricjsWhiteboardComponent } from './ngx-fabricjs-whiteboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    NgxFabricjsWhiteboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    DragDropModule,
    FlexLayoutModule
  ],
  exports: [
    NgxFabricjsWhiteboardComponent
  ]
})
export class NgxFabricjsWhiteboardModule { }
