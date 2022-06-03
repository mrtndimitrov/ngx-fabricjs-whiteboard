import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'ngx-fabricjs-whiteboard',
  templateUrl: './ngx-fabricjs-whiteboard.component.html',
  styleUrls: ['./ngx-fabricjs-whiteboard.component.scss']
})
export class NgxFabricjsWhiteboardComponent implements OnInit {
  private canvas: any;
  constructor() { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('ngx-fabricjs-whiteboard', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });
    this.canvas.setWidth(1200);
    this.canvas.setHeight(800);
  }

  addFigure(figure: string) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  addText(textString: string) {
    const text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
  }

  private selectItemAfterAdded(obj: any) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

}
