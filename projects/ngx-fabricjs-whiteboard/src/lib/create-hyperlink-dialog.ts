import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-fabricjs-whiteboard-create-hyperlink-dialog',
  template: `<h1 mat-dialog-title>Създаване на хипервръзка</h1>
  <div mat-dialog-content [formGroup]="hyperlinkForm">
    <p>След въвеждане на текста и хипервръзката, тя може да бъде активирана чрез натискане на бутона Ctrl и левия бутон на мишката</p>
    <mat-form-field appearance="outline">
      <mat-label>Въведи текст</mat-label>
      <textarea matInput placeholder="Текст" formControlName="text" autocomplete="off"></textarea>
      <mat-error *ngIf="hyperlinkForm.get('text')!.invalid && hyperlinkForm.get('text')!.touched && hyperlinkForm.get('text')!.errors!['required']">Не е въведен текст на хипервръзката</mat-error>
    </mat-form-field>
    <mat-form-field appearance="outline">
      <mat-label>Въведи хипервръзка</mat-label>
      <mat-icon matSuffix>link</mat-icon>
      <input matInput placeholder="Хипервръзка" formControlName="link" autocomplete="off">
      <mat-error *ngIf="hyperlinkForm.get('link')!.invalid && hyperlinkForm.get('link')!.touched && hyperlinkForm.get('link')!.errors!['required']">Не е въведена хипервръзката</mat-error>
      <mat-error *ngIf="hyperlinkForm.get('link')!.invalid && hyperlinkForm.get('link')!.touched && hyperlinkForm.get('link')!.errors!['noProtocol']">Невалидна хипервръзка. Трябва да започва с http(s)://</mat-error>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="cancel()">Откажи</button>
    <button mat-button (click)="create()">Създай</button>
  </div>`,
  styles: [`mat-form-field {display: block;}`]
})
export class CreateHyperlinkDialog {
  hyperlinkForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CreateHyperlinkDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.hyperlinkForm = this.formBuilder.group({
      text: [{value: data.text, disabled: false}, [Validators.required]],
      link: [{value: '', disabled: false}, [Validators.required, this.HyperlinkValidator.bind(this)]],
    });
  }

  create() {
    if (this.hyperlinkForm!.invalid) {
      this.hyperlinkForm!.get('text')?.markAsTouched({ onlySelf: true });
      this.hyperlinkForm!.get('link')?.markAsTouched({ onlySelf: true });
      return;
    }
    this.dialogRef.close({
      text: this.hyperlinkForm!.get('text')?.value,
      link: this.hyperlinkForm!.get('link')?.value
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  HyperlinkValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!this.hyperlinkForm) {
      return null;
    }
    const regex = new RegExp('^http(s)?://', 'i');
    return regex.test(control.value) ? null : { noProtocol: true };
  }
}
