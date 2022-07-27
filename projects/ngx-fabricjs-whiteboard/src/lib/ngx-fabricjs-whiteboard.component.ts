import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { fabric } from 'fabric';
import { loadIcons } from './load-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-fabricjs-whiteboard',
  templateUrl: './ngx-fabricjs-whiteboard.component.html',
  styleUrls: ['./ngx-fabricjs-whiteboard.component.scss']
})
export class NgxFabricjsWhiteboardComponent implements OnInit {
  canvas: any;
  strokeColor: string = '#2d358e';
  fillColor: string = '#2d358e';
  selectedTool: string = 'pointer';
  drawingFigure: any = null;
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  figuresMenuOpened: boolean = false;

  @ViewChild('ngxFabricjsWhiteboardContainer', {static: true}) whiteboardContainer!: ElementRef;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    loadIcons(iconRegistry, sanitizer);
  }

  ngOnInit(): void {
    const height = this.whiteboardContainer.nativeElement.clientHeight;
    const width = this.whiteboardContainer.nativeElement.clientWidth;
    this.canvas = new fabric.Canvas('ngx-fabricjs-whiteboard', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: '#2d358e'
    });
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);

    this.canvas.on('mouse:down', (o: any) => {
      if (!this.isFigureSelected()) {
        return;
      }
      this.mouseDown = true;
      const pointer = this.canvas.getPointer(o.e);
      this.startX = this.endX = pointer.x;
      this.startY = this.endY = pointer.y;
      const options: any = {
        originX: 'left',
        originY: 'top',
        width: 1,
        height: 1,
        left: this.startX,
        top: this.startY,
        strokeWidth: 2,
        stroke: this.strokeColor,
        fill: null,
        transparentCorners: false
      };
      switch (this.selectedTool) {
        // @ts-ignore
        case 'filled-square':
        // @ts-ignore
        case 'filled-rectangle':
          options.fill = this.fillColor;
        case 'square':
        case 'rectangle':
          options.angle = 0;
          this.drawingFigure = new fabric.Rect(options);
          break;
        // @ts-ignore
        case 'filled-circle':
          options.fill = this.fillColor;
        case 'circle':
          options.radius = 1;
          options.rx = 1;
          options.ry = 1;
          delete options.width;
          delete options.height;
          this.drawingFigure = new fabric.Ellipse(options);
          break;
        // @ts-ignore
        case 'filled-triangle':
        case 'triangle':
          this.drawingFigure = new fabric.Triangle(options);
          break;
        // @ts-ignore
        case 'filled-hexagon':
          options.fill = this.fillColor;
        case 'hexagon':
          delete options.width;
          delete options.height;
          options.strokeLineJoin = 'bevil';
          this.drawingFigure = new fabric.Polygon([
            {x: this.startX, y: this.startY},
            {x: this.startX, y: this.startY},
            {x: this.startX, y: this.startY},
            {x: this.startX, y: this.startY},
            {x: this.startX, y: this.startY},
            {x: this.startX, y: this.startY},
          ], options);
          break;
        case 'line':
          delete options.width;
          delete options.height;
          this.drawingFigure = new fabric.Line([this.startX, this.startY, this.startX + 1, this.startY + 1], options);
      }
      this.canvas.add(this.drawingFigure);
      this.selectItemAfterAdded(this.drawingFigure);
    });

    this.canvas.on('mouse:move', (o: any) => {
      if (!this.mouseDown) {
        return;
      }
      const pointer = this.canvas.getPointer(o.e);
      this.endX = pointer.x;
      this.endY = pointer.y;

      if (this.startX > this.endX) {
        this.drawingFigure.set({ left: Math.abs(this.endX) });
      }
      if (this.startY > this.endY) {
        this.drawingFigure.set({ top: Math.abs(this.endY) });
      }

      const width = Math.abs(this.startX - this.endX);
      const height = Math.abs(this.startY - this.endY);

      if (this.selectedTool === 'circle' || this.selectedTool === 'filled-circle') {
        if (o.e.shiftKey) {
          this.drawingFigure.set({
            rx: Math.min(width, height) / 2,
            ry: Math.min(width, height) / 2
          });
        } else {
          this.drawingFigure.set({
            rx: width / 2,
            ry: height / 2
          });
        }
      } else if (this.selectedTool === 'hexagon' || this.selectedTool === 'filled-hexagon') {
        const radius = Math.min(width, height) / 2;
        const a = 2 * Math.PI / 6;
        const x = (this.startX + this.endX) / 2;
        const y = (this.startY + this.endY) / 2
        const points = [];
        for (let i = 0; i < 6; i++) {
          points.push({x: x + radius * Math.cos(a * i), y: y + radius * Math.sin(a * i)});
        }
        this.drawingFigure.set({points: points});
      } else if (this.selectedTool === 'line') {
        this.drawingFigure.set({x2: this.endX, y2: this.endY})
      } else {
        this.drawingFigure.set({
          width: (this.selectedTool === 'square' || this.selectedTool === 'filled-square') && width > height ? height : width,
          height: (this.selectedTool === 'square' || this.selectedTool === 'filled-square') && height > width ? width : height
        });
      }

      this.drawingFigure.setCoords();
      this.canvas.renderAll();
    });

    this.canvas.on('mouse:up', (o: any) => {
      this.canvas.defaultCursor = 'default';
      this.mouseDown = false;
      if (this.isFigureSelected()) {
        this.drawingFigure = null;
        this.selectedTool = 'pointer';
        this.canvas.set({selection: true});
      }
    });

    this.canvas.on('mouse:dblclick', (o: any) => {
      const obj = o.target;
      if (obj && obj.get('type') === 'line') {
        const centerX = obj.getCenterPoint().x;
        const centerY = obj.getCenterPoint().y;
        const x1offset = obj.calcLinePoints().x1;
        const y1offset = obj.calcLinePoints().y1;
        const x2offset = obj.calcLinePoints().x2;
        const y2offset = obj.calcLinePoints().y2;
        const x1 = centerX + x1offset;
        const y1 = centerY + y1offset;
        const x2 = centerX + x2offset;
        const y2 = centerY + y2offset;
        console.log(obj)
        console.log(obj.calcLinePoints())
        const p1 = new fabric.Circle({
          // @ts-ignore
          id: 'line-pointer-1',
          radius: obj.strokeWidth * 3,
          fill: '#2d358e',
          top: y1,
          left: x1,
          originX: 'center',
          originY: 'center',
          hasBorders: false,
          hasControls: false
        });
        const p2 = new fabric.Circle({
          // @ts-ignore
          id: 'line-pointer-2',
          radius: obj.strokeWidth * 3,
          fill: '#2d358e',
          top: y2,
          left: x2,
          originX: 'center',
          originY: 'center',
          hasBorders: false,
          hasControls: false
        });
        this.canvas.add(p1, p2);
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
        obj.set('doubleClicked', true);
      }
    });

    this.canvas.on('object:moving', (o: any) => {
      const obj = o.target;
      if (obj.id === 'line-pointer-1' || obj.id === 'line-pointer-2') {
        this.canvas.getObjects('line').every((lineObj: any) => {
          if (lineObj.doubleClicked) {
            lineObj.set({
              x1: obj.id === 'line-pointer-1' ? obj.left : lineObj.aCoords.tl.x,
              y1: obj.id === 'line-pointer-1' ? obj.top : lineObj.aCoords.tl.y,
              x2: obj.id === 'line-pointer-2' ? obj.left : lineObj.aCoords.br.x,
              y2: obj.id === 'line-pointer-2' ? obj.top : lineObj.aCoords.br.y,
            });
            lineObj.setCoords();
            return false;
          }
          return true;
        });
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.key === 'Shift' && this.mouseDown) {
      const width = Math.abs(this.startX - this.endX);
      const height = Math.abs(this.startY - this.endY);
      if (this.selectedTool === 'circle' || this.selectedTool === 'filled-circle') {
        this.drawingFigure.set({
          rx: Math.min(width, height) / 2,
          ry: Math.min(width, height) / 2
        });
      }
      this.canvas.renderAll();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.key === 'Shift' && this.mouseDown) {
      const width = Math.abs(this.startX - this.endX);
      const height = Math.abs(this.startY - this.endY);
      if (this.selectedTool === 'circle' || this.selectedTool === 'filled-circle') {
        this.drawingFigure.set({
          rx: width / 2,
          ry: height / 2
        });
      }
      this.canvas.renderAll();
    }
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

  isFigureSelected() {
    return this.selectedTool === 'square' || this.selectedTool === 'filled-square' ||
      this.selectedTool === 'circle' || this.selectedTool === 'filled-circle' ||
      this.selectedTool === 'rectangle' || this.selectedTool === 'filled-rectangle' ||
      this.selectedTool === 'hexagon' || this.selectedTool === 'filled-hexagon' ||
      this.selectedTool === 'triangle' || this.selectedTool === 'filled-triangle' ||
      this.selectedTool === 'line' || this.selectedTool === 'delimited-line' ||
      this.selectedTool === 'arrow';
  }

  figuresMenuClosed() {
    if (this.isFigureSelected()) {
      this.canvas.defaultCursor = 'crosshair';
      this.canvas.set({selection: false});
    } else {
      this.canvas.defaultCursor = 'default';
      this.canvas.set({selection: true});
    }
  }

  private selectItemAfterAdded(obj: any) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

}
