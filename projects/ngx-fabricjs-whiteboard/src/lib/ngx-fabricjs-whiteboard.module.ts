import { NgModule } from '@angular/core';
import { NgxFabricjsWhiteboardComponent } from './ngx-fabricjs-whiteboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UploadImageDialog } from './upload-image-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHyperlinkDialog } from './create-hyperlink-dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    NgxFabricjsWhiteboardComponent,
    UploadImageDialog,
    CreateHyperlinkDialog
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        DragDropModule,
        FlexLayoutModule,
        MatMenuModule,
        ColorPickerModule,
        MatSliderModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatButtonModule,
        NgxDropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDividerModule
    ],
  exports: [
    NgxFabricjsWhiteboardComponent
  ]
})
export class NgxFabricjsWhiteboardModule { }
