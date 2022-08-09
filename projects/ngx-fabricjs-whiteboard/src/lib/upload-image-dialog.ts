import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-fabricjs-whiteboard-upload-image-dialog',
  template: `
    <ngx-dropzone id="dialog-image-upload" (change)="onSelect($event)" [multiple]="false" accept="image/jpeg,image/jpg,image/png,image/gif,image/svg+xml,image/bmp">
      <div id="title">Добави файл от своето устройство,<br>като кликнеш на бутона или го привлачиш тук.</div>
      <div id="upload-button-container">
        <button mat-flat-button >
          <mat-icon svgIcon="upload-image"></mat-icon>
          <span>Качване на изображение</span>
        </button>
      </div>
    </ngx-dropzone>`,
  styles: [`#dialog-image-upload {display: block;padding: 30px 0;height:inherit}`,
    `#title {color: #9b9b9b; font-size: 14px; text-align: center; margin: 0 100px}`,
    `#upload-button-container {text-align: center; margin-top: 30px;}`,
    `#upload-button-container button {color: white; background-color:#f89400}`,
    `#upload-button-container button span {display: inline-block; margin: 5px 0 0 5px;}`,
    `#upload-button-container mat-icon #upload-image-icon {color: white}`,
    `::ng-deep #upload-button-container mat-icon #upload-image-icon .cls-1 {fill:#f89400}`
  ]
})
export class UploadImageDialog {
  constructor(public dialogRef: MatDialogRef<UploadImageDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onSelect(event: any) {
    this.readFile(event.addedFiles[0]).then(fileContents => {
      this.dialogRef.close(fileContents);
    });
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        // @ts-ignore
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }
}
