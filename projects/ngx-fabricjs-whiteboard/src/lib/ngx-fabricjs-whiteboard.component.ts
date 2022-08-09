import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { loadIcons } from './load-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageDialog } from './upload-image-dialog';
import 'fabric-history';
import { CreateHyperlinkDialog } from './create-hyperlink-dialog';
import { downloadCanvas } from './download-canvas';

declare const fabric: any;

@Component({
  selector: 'ngx-fabricjs-whiteboard',
  templateUrl: './ngx-fabricjs-whiteboard.component.html',
  styleUrls: ['./ngx-fabricjs-whiteboard.component.scss']
})
export class NgxFabricjsWhiteboardComponent implements OnInit {
  canvas: any;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  contextMenuX: string = '0px';
  contextMenuY: string = '0px';
  zoomLevel: number = 1;
  fullScreen: boolean = false;
  panHandStarting: boolean = false;
  panHandStarted: boolean = false;
  panX: number = 0;
  panY: number = 0;
  copiedObject: any = null;

  bg: string = '';
  bgColor: string = '#FFF';
  bgSize: number = 60;
  bgOpacity: number = 1;

  isUploadImageDialogOpened: boolean = false;
  toolsColor: string = '';
  figureStrokeColor: string = '';
  figureFillColor: string = '';
  figureStokeWidth: number | null = 2;
  figureToolSelected: string = 'square';
  figureToolSelectedFilled: boolean = false;
  selectedFigureStrokeColor: string = '';
  selectedFigureFillColor: string = '';
  selectedFigureStokeWidth: number | null = 0;
  selectedObjects: Array<any> = [];
  selectedTool: string = 'pointer';
  drawingFigure: any = null;
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  isFiguresMenuOpened: boolean = false;

  loadedFonts: Array<any> = [];
  textFont: string = '';
  selectedTextFont: string = '';
  textColor: string = '';
  selectedTextColor: string = '';
  textSize: number = 24;
  selectedTextSize: number = 0;
  fontStyles: Array<string> = [];
  selectedFontStyles: Array<string> | null = null;
  textAlign: string = 'left';
  selectedTextAlign: string = '';

  drawToolSelected: string = 'marker';
  isDrawMenuOpened: boolean = false;
  pencilWidth: number | null = 4;
  selectedPencilWidth: number | null = 0;
  pencilColor: string = '#191919';
  selectedPencilColor: string = '';
  markerWidth: number | null = 40;
  selectedMarkerWidth: number | null = 0;
  markerColor: string = '#ee422c';
  selectedMarkerColor: string = '';
  markerOpacity: number | null = 0.5;
  selectedMarkerOpacity: number | null = 0;
  bucketColor: string = '';
  selectedBucketColor: string = '';

  isEraserMenuOpened: boolean = false;
  isBackgroundMenuOpened: boolean = false;

  @ViewChild('ngxFabricjsWhiteboardContainer', {static: true}) whiteboardContainer!: ElementRef;
  @ViewChild('figuresMenuTrigger', {static: true}) figuresMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('textMenuTrigger', {static: true}) textMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('eraserMenuTrigger', {static: true}) eraserMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('drawMenuTrigger', {static: true}) drawMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('pencilDrawMenuTrigger', {static: true}) pencilDrawMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('markerDrawMenuTrigger', {static: true}) markerDrawMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('bucketDrawMenuTrigger', {static: true}) bucketDrawMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('backgroundMenuTrigger', {static: true}) backgroundMenuTrigger: MatMenuTrigger | null = null;
  @ViewChild('contextMenu', {static: true}) contextMenu: MatMenu | null = null;
  @ViewChild('contextMenuMenuTrigger', {static: true}) contextMenuMenuTrigger: MatMenuTrigger | null = null;

  @Input() set primaryColor(value: string) {
    this.figureStrokeColor = this.figureFillColor = this.toolsColor = this.textColor = value;
  }
  @Input() set fonts(value: Array<any>) {
    this.loadedFonts = value;
    this.textFont = this.loadedFonts[0].name;
  }
  @Input() allowBackgroundChange: boolean = true;
  @Input() noHeader: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dialog: MatDialog) {
    loadIcons(iconRegistry, sanitizer);
  }

  ngOnInit(): void {
    this.canvasWidth = this.whiteboardContainer.nativeElement.clientWidth;
    this.canvasHeight = this.whiteboardContainer.nativeElement.clientHeight - (this.noHeader ? 0 : 42);
    this.canvas = new fabric.Canvas('ngx-fabricjs-whiteboard', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: this.toolsColor,
      preserveObjectStacking: true,
      backgroundColor: null
    });
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);

    this.canvas.on({
      'mouse:down': this.canvasMouseDown.bind(this),
      'mouse:move': this.canvasMouseMove.bind(this),
      'mouse:up': this.canvasMouseUp.bind(this),
      'mouse:dblclick': this.canvasMouseDblclick.bind(this),
      'object:moving': this.canvasObjectMoving.bind(this),
      'selection:created': this.canvasSelectionCreated.bind(this),
      'selection:cleared': this.canvasSelectionCleared.bind(this),
      'text:changed': this.canvasTextChanged.bind(this)
    });
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullScreenToggled(event: any) {
    // if document.fullscreenElement is null, we have exited fullscreen
    // we need to make our var in sync. that's it
    if (document.fullscreenElement && !this.fullScreen) {
      this.fullScreen = true;
    } else if (!document.fullscreenElement && this.fullScreen) {
      this.fullScreen = false;
    }
  }

  @HostListener('window:resize')
  containerResized() {
    this.canvasWidth = this.whiteboardContainer.nativeElement.clientWidth;
    this.canvasHeight = this.whiteboardContainer.nativeElement.clientHeight - (this.noHeader ? 0 : 42);
    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
  }

  @HostListener('mousedown', ['$event'])
  click(event: MouseEvent){
    this.textMenuTrigger!.closeMenu();
    this.figuresMenuTrigger!.closeMenu();
    this.eraserMenuTrigger!.closeMenu();
    this.drawMenuTrigger!.closeMenu();
    this.pencilDrawMenuTrigger!.closeMenu();
    this.markerDrawMenuTrigger!.closeMenu();
    this.bucketDrawMenuTrigger!.closeMenu();
    if (this.backgroundMenuTrigger) {
      this.backgroundMenuTrigger!.closeMenu();
    }
    this.contextMenuMenuTrigger!.closeMenu();
  }

  @HostListener('contextmenu', ['$event'])
  rightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuMenuTrigger!.closeMenu();

    // we record the mouse position in our object
    this.contextMenuX = event.clientX + 'px';
    this.contextMenuY = event.clientY + 'px';

    // let's see if user clicked over an object
    const target = this.canvas.findTarget(event, false);
    if (target) {
      this.canvas.discardActiveObject();
      this.canvas.setActiveObject(target);
      // if it is a hyperlink, make the textbox the actual selection
      if (target.get('type') === 'group') {
        this.selectedObjects = [this.getTextboxFromGroup(target)];
      } else {
        this.selectedObjects = [target];
      }
    }
    this.canvas.requestRenderAll();
    this.contextMenuMenuTrigger!.openMenu();
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
      this.canvas.requestRenderAll();
    } else if (event.key === 'Delete' && this.selectedObjects.length > 0) {
      this.deleteObjects();
    } else if (event.code === 'Space' && this.selectedTool === 'pointer' && !this.panHandStarting && !this.canvas.getActiveObject().isEditing) {
      this.panHandStarting = true;
      this.canvas.set('defaultCursor', 'grab');
      this.canvas.set({selection: false});
      this.canvasSelectionCleared();
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    } else if (event.key === ']' && event.ctrlKey && this.selectedObjects.length > 0) {
      if (event.shiftKey) {
        this.bringToFront();
      } else {
        this.bringForward();
      }
    } else if (event.key === '[' && event.ctrlKey && this.selectedObjects.length > 0) {
      if (event.shiftKey) {
        this.sendToBack();
      } else {
        this.sendBackward();
      }
    } else if (event.key === 'c' && event.ctrlKey && this.selectedObjects.length > 0) {
      this.copy();
    } else if (event.key === 'v' && event.ctrlKey) {
      this.paste();
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
      this.canvas.requestRenderAll();
    } else if (event.code === 'Space' && this.panHandStarting) {
      this.panHandStarted = false;
      this.panHandStarting = false;
      this.canvas.set('defaultCursor', 'default');
      this.canvas.set({selection: true});
      this.canvas.requestRenderAll();
    }
  }

  pointerSelected() {
    this.selectedTool = 'pointer';
    this.figuresMenuTrigger!.closeMenu();
    this.textMenuTrigger!.closeMenu();
    this.drawMenuTrigger!.closeMenu();
    this.eraserMenuTrigger!.closeMenu();
    if (this.backgroundMenuTrigger) {
      this.backgroundMenuTrigger!.closeMenu();
    }
    this.canvas.isDrawingMode = false;
    this.canvas.set({selection: true});
    this.canvas.discardActiveObject();
    this.canvas.set('defaultCursor', 'default');
    this.canvas.requestRenderAll();
  }

  toggleFullScreen() {
    if (!this.fullScreen) {
      this.fullScreen = true;
      // @ts-ignore
      if (document.documentElement.requestFullScreen) {
        // @ts-ignore
        document.documentElement.requestFullScreen();
      // @ts-ignore
      } else if (document.documentElement.mozRequestFullScreen) {
        // @ts-ignore
        document.documentElement.mozRequestFullScreen();
      // @ts-ignore
      } else if (document.documentElement.webkitRequestFullScreen) {
        // @ts-ignore
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      this.fullScreen = false;
      // @ts-ignore
      if (document.cancelFullScreen) {
        // @ts-ignore
        document.cancelFullScreen();
      // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
      // @ts-ignore
      } else if (document.webkitCancelFullScreen) {
        // @ts-ignore
        document.webkitCancelFullScreen();
      }
    }
  }

  zoom(direction: number) {
    this.zoomLevel = (0.1 * direction) + this.zoomLevel;
    if (this.selectedObjects.length > 0) {
      this.canvas.centerObject(this.selectedObjects[0]);
    }
    const center = this.canvas.getCenter();
    const centerPoint = new fabric.Point(center.left, center.top);
    this.canvas.zoomToPoint(centerPoint, this.zoomLevel);
    this.canvas.requestRenderAll();
  }

  getZoomLevel() {
    return Math.floor(this.zoomLevel * 100)
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

  bringToFront() {
    for (const obj of this.selectedObjects) {
      obj.bringToFront();
    }
    this.canvas.requestRenderAll();
  }
  bringForward() {
    for (const obj of this.selectedObjects) {
      obj.bringForward();
    }
    this.canvas.requestRenderAll();
  }
  sendBackward() {
    for (const obj of this.selectedObjects) {
      obj.sendBackwards();
    }
    this.canvas.requestRenderAll();
  }
  sendToBack() {
    for (const obj of this.selectedObjects) {
      obj.sendToBack();
    }
    this.canvas.requestRenderAll();
  }

  deleteObjects() {
    this.selectedObjects.forEach((obj: any) => {
      this.canvas.remove(obj);
    });
    this.selectedObjects = [];
    this.canvasSelectionCleared();
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  save() {

  }

  download() {
    downloadCanvas(this.canvas, this.bg, this.bgColor, this.bgSize, this.bgOpacity);
  }

  copy() {
    this.canvas.getActiveObject().clone((cloned: any) => {
      this.copiedObject = cloned;
    });
  }
  paste() {
    if (this.copiedObject) {
      this.copiedObject.clone((clonedObj: any) => {
        this.canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.canvas;
          clonedObj.forEachObject((obj: any) => {
            this.canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          this.canvas.add(clonedObj);
        }
        this.copiedObject.top += 10;
        this.copiedObject.left += 10;
        this.canvas.setActiveObject(clonedObj);
        this.canvas.requestRenderAll();
      });
    }
  }

  visitHyperlink(group: any) {
    const text: any = this.getTextboxFromGroup(group);
    if (text) {
      window.open(text.get('hyperlink'), '_blank');
    }
  }

  figuresMenuOpened() {
    this.selectedTool = (this.figureToolSelectedFilled ? 'filled-' : '') + this.figureToolSelected;
    this.isFiguresMenuOpened = true;
    this.canvas.isDrawingMode = false;
  }
  figuresMenuClosed() {
    this.isFiguresMenuOpened = false;
    if (this.isFigureSelected()) {
      this.canvas.set('defaultCursor', 'crosshair');
      this.canvas.set({selection: false});
    } else {
      this.canvas.set('defaultCursor', 'default');
      this.canvas.set({selection: true});
    }
  }

  selectFigureTool(tool: string) {
    this.selectedTool = tool;
    if (tool.indexOf('filled-') !== -1) {
      this.figureToolSelected = tool.replace('filled-', '');
      this.figureToolSelectedFilled = true;
    } else {
      this.figureToolSelected = tool;
      this.figureToolSelectedFilled = false;
    }
  }

  eraserMenuOpened() {
    this.eraserPressed();
    this.isEraserMenuOpened = true;
  }

  eraserMenuClosed() {
    this.isEraserMenuOpened = false;
  }

  backgroundMenuOpened() {
    this.isBackgroundMenuOpened = true;
  }

  backgroundMenuClosed() {
    this.isBackgroundMenuOpened = false;
  }

  selectBackground(bg: string) {
    this.bg = bg;
  }

  backGroundWidthLabel(value: number) {
    return `${value + 40}%`;
  }

  backGroundOpacityLabel(value: number) {
    return `${value * 100}%`;
  }

  isEraserSelected() {
    return this.selectedTool === 'eraser';
  }

  eraserPressed() {
    this.selectedTool = 'eraser';
    this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
    this.canvas.freeDrawingBrush.width = 25;
    this.canvas.isDrawingMode = true;
    this.canvas.requestRenderAll();
  }

  clearCanvas() {
    this.canvas.remove(...this.canvas.getObjects());
    this.selectedTool = 'pointer';
    this.eraserMenuTrigger!.closeMenu()
    this.canvas.isDrawingMode = false;
    this.canvas.requestRenderAll();
  }

  textMenuOpened() {
    this.selectedTool = 'text';
    this.canvas.isDrawingMode = false;
    this.canvas.set({selection: false});
    this.canvas.set('defaultCursor', 'text');
    this.canvas.requestRenderAll();
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject.get('type') === 'textbox' && activeObject.isEditing && activeObject.getSelectedText()) {
      const selections = activeObject.getSelectionStyles(activeObject.selectionStart, activeObject.end, true);
      this.selectedTextColor = selections[0].fill;
      this.selectedTextSize = selections[0].fontSize;
      this.selectedTextFont = selections[0].fontFamily;
      this.selectedFontStyles = [];
      if (selections[0].fontWeight === 'bold') {
        this.selectedFontStyles.push('bold');
      }
      if (selections[0].fontStyle === 'italic') {
        this.selectedFontStyles.push('italic');
      }
      if (selections[0].underline === true) {
        this.selectedFontStyles.push('underline');
      }
      if (selections[0].linethrough === true) {
        this.selectedFontStyles.push('linethrough');
      }
    }
  }

  drawMenuOpened() {
    this.isDrawMenuOpened = true;
    if (this.drawToolSelected === 'pencil') {
      this.pencilPressed();
    } else if (this.drawToolSelected === 'marker') {
      this.markerPressed();
    } else if (this.drawToolSelected === 'bucket') {
      this.bucketPressed();
    }
  }
  drawMenuClosed() {
    this.isDrawMenuOpened = false;
    if (this.selectedTool === 'pencil' || this.selectedTool === 'marker') {
      this.canvas.isDrawingMode = true;
    } else {
      this.canvas.isDrawingMode = false;
    }
  }

  isDrawSelected() {
    return this.selectedTool === 'pencil' || this.selectedTool === 'marker' || this.selectedTool === 'bucket';
  }

  colorSelected(type: string, color: string) {
    if (this.selectedObjects.length > 0) {
      if (type === 'text') this.selectedTextColor = color;
      else if (type === 'figure-stroke') this.selectedFigureStrokeColor = color;
      else if (type === 'figure-fill') this.selectedFigureFillColor = color;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if ((objectType === 'ellipse' || objectType === 'rect' || objectType === 'triangle'
                || objectType === 'polygon' || objectType === 'line') && type === 'figure-stroke') {
          selectedObject.set('stroke', color);
        } else if ((objectType === 'ellipse' || objectType === 'rect'
                || objectType === 'triangle' || objectType === 'polygon') && type === 'figure-fill') {
          selectedObject.set('fill', color);
        } else if (objectType === 'textbox' && type === 'text') {
          if (selectedObject.isEditing && selectedObject.getSelectedText()) {
            selectedObject.setSelectionStyles({fill: color}, selectedObject.selectionStart, selectedObject.end);
          } else {
            selectedObject.set('fill', color);
          }
        }
      }
      this.canvas.requestRenderAll();
    } else {
      if (type === 'text') this.textColor = color;
      else if (type === 'figure-stroke') this.figureStrokeColor = color;
      else if (type === 'figure-fill') this.figureFillColor = color;
    }
  }

  strokeWidthSelected(width: number | null) {
    if (this.selectedObjects.length > 0) {
      this.selectedFigureStokeWidth = width;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'ellipse' || objectType === 'rect' || objectType === 'triangle'
          || objectType === 'polygon' || objectType === 'line') {
          selectedObject.set('strokeWidth', width);
        }
      }
      this.canvas.requestRenderAll();
    } else {
      this.figureStokeWidth = width;
    }
  }

  drawWidthSelected(type: string, width: number | null) {
    this.canvas.freeDrawingBrush.width = width;
    if (this.selectedObjects.length > 0) {
      if (type === 'pencil') this.selectedPencilWidth = width;
      else if (type === 'marker') this.selectedMarkerWidth = width;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'path') {
          selectedObject.set('strokeWidth', width);
        }
      }
      this.canvas.requestRenderAll();
    } else {
      if (type === 'pencil') this.pencilWidth = width;
      else if (type === 'marker') this.markerWidth = width;
    }
  }

  drawOpacitySelected(type: string, opacity: number | null) {
    opacity = this.round(1 - opacity!, 1);
    if (type === 'marker'){
      this.canvas.freeDrawingBrush.color = this.hexToRgba(this.selectedMarkerColor ? this.selectedMarkerColor : this.markerColor, opacity!);
    }
    if (this.selectedObjects.length > 0) {
      if (type === 'marker') this.selectedMarkerOpacity = opacity;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'path') {
          selectedObject.set('stroke', this.hexToRgba(this.selectedMarkerColor ? this.selectedMarkerColor : this.markerColor, opacity!));
        }
      }
      this.canvas.requestRenderAll();
    } else {
      if (type === 'marker') this.markerOpacity = opacity;
    }
  }

  drawOpacityLabel(value: number) {
    return `${value * 100}%`;
  }

  drawColorSelected(type: string, color: string) {
    if (type === 'pencil') {
      this.canvas.freeDrawingBrush.color = color;
    } else if (type === 'marker') {
      this.canvas.freeDrawingBrush.color = this.hexToRgba(color, this.selectedMarkerOpacity ? this.selectedMarkerOpacity : this.markerOpacity!);
    }
    if (this.selectedObjects.length > 0) {
      if (type === 'pencil') this.selectedPencilColor = color;
      else if (type === 'marker') this.selectedMarkerColor = color;
      else if (type === 'bucket') this.selectedBucketColor = color;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'path') {
          selectedObject.set('stroke', this.hexToRgba(color, this.selectedMarkerOpacity!));
        }
      }
      this.canvas.requestRenderAll();
    } else {
      if (type === 'pencil') this.pencilColor = color;
      else if (type === 'marker') this.markerColor = color;
      else if (type === 'bucket') this.bucketColor = color;
    }
  }

  textFontSelected(textFont: string) {
    if (this.selectedObjects.length > 0) {
      this.selectedTextFont = textFont;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'textbox') {
          if (selectedObject.isEditing && selectedObject.getSelectedText()) {
            selectedObject.setSelectionStyles({fontFamily: textFont}, selectedObject.selectionStart, selectedObject.end);
          } else {
            selectedObject.set('fontFamily', textFont);
          }
        }
      }
      this.canvas.requestRenderAll();
    } else {
      this.textFont = textFont;
    }
  }

  textSizeSelected(textSize: number) {
    if (this.selectedObjects.length > 0) {
      this.selectedTextSize = textSize;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'textbox') {
          if (selectedObject.isEditing && selectedObject.getSelectedText()) {
            selectedObject.setSelectionStyles({fontSize: textSize}, selectedObject.selectionStart, selectedObject.end);
          } else {
            selectedObject.set('fontSize', textSize);
          }
        }
      }
      this.canvas.requestRenderAll();
    } else {
      this.textSize = textSize;
    }
  }

  fontStylesChanged(fontStyles: Array<string>) {
    if (this.selectedObjects.length > 0) {
      this.selectedFontStyles = fontStyles;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'textbox') {
          if (this.selectedFontStyles.indexOf('bold') !== -1) {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({fontWeight: 'bold'}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('fontWeight', 'bold');
            }
          } else {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({fontWeight: ''}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('fontWeight', '');
            }
          }
          if (this.selectedFontStyles.indexOf('italic') !== -1) {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({fontStyle: 'italic'}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('fontStyle', 'italic');
            }
          } else {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({fontStyle: 'normal'}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('fontStyle', 'normal');
            }
          }
          if (this.selectedFontStyles.indexOf('underline') !== -1) {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({underline: true}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('underline', true);
            }
          } else {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({underline: false}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('underline', false);
            }
          }
          if (this.selectedFontStyles.indexOf('linethrough') !== -1) {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({linethrough: true}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('linethrough', true);
            }
          } else {
            if (selectedObject.isEditing && selectedObject.getSelectedText()) {
              selectedObject.setSelectionStyles({linethrough: false}, selectedObject.selectionStart, selectedObject.end);
            } else {
              selectedObject.set('linethrough', false);
            }
          }
        }
      }
      this.canvas.requestRenderAll();
    } else {
      this.fontStyles = fontStyles;
    }
  }

  textAlignChanged(textAlign: string) {
    if (this.selectedObjects.length > 0) {
      this.selectedTextAlign = textAlign;
      for (const selectedObject of this.selectedObjects) {
        const objectType = selectedObject.get('type');
        if (objectType === 'textbox') {
          selectedObject.set('textAlign', textAlign);
        }
      }
      this.canvas.requestRenderAll();
    } else {
      this.textAlign = textAlign;
    }
  }

  createHyperlink() {
    let text =  '';
    let link = '';
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject.get('type') === 'textbox') {
      text = activeObject.text;
      if (activeObject.hyperlink) {
        link = activeObject.hyperlink;
      }
    }
    const dialogRef = this.dialog.open(CreateHyperlinkDialog, {
      data: {text, link},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.text && result.link) {
        let textObj: any;
        fabric.Image.fromURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAsElEQVRIie2SzQ3CMAxGH7AEdCVaMQFrkAFQJZYCOkCnIb1wKgcMWJZT/noAKU+yIn1O7C9xIJP5O1ZAA3RAb8Ji8x1wBKpU8Z1z6J0GOmrPeQ+cgQ1QDF/UpQCC1OiBUicbEcMHhS1Bah20GEVcmM1Dz5B6vrloJ4CpSU6+tQ/MlLl7g1bWtdPwldDcarRarHgMOTDOkJd2Q81433SbclFynX50Dj1rEIG95zyT+XEuFRpXEhVovf0AAAAASUVORK5CYII=', (img: any) => {
          if (activeObject && activeObject.get('type') === 'textbox') {
            textObj = activeObject;
            textObj.set('text', result.text);
            textObj.set('hyperlink', result.link);
            textObj.set('underline', true);
            img.top = textObj.top + 5;
            img.left = textObj.left - 30;
            this.canvasSelectionCleared();
            this.canvas.discardActiveObject();
          } else {
            const center = this.canvas.getCenter();
            const centerPoint = new fabric.Point(center.left, center.top);
            textObj = new fabric.Textbox(result.text, {
              left: centerPoint.x,
              top: centerPoint.y,
              fontFamily: this.textFont,
              angle: 0,
              fill: this.textColor,
              fontWeight: this.fontStyles.indexOf('bold') !== -1 ? 'bold' : '',
              fontStyle: this.fontStyles.indexOf('italic') !== -1 ? 'italic' : 'normal',
              underline: true,
              linethrough: this.fontStyles.indexOf('linethrough') !== -1,
              hasRotatingPoint: true,
              fontSize: this.textSize,
              textAlign: this.textAlign
            });
            img.top = centerPoint.y + 5;
            img.left = centerPoint.x - 30;
            textObj.set('hyperlink', result.link);
          }
          this.canvasTextChanged({target: textObj});
          const group = new fabric.Group([img, textObj]);
          textObj.hyperLinkGroup = group;
          this.canvas.add(group);
          this.canvas.requestRenderAll();
        });

      }
    });
  }

  removeHyperlink() {
    if (this.isHyperLinkSelected()) {
      const group = this.selectedObjects[0].hyperLinkGroup;
      delete this.selectedObjects[0].hyperLinkGroup;
      group.removeWithUpdate(this.selectedObjects[0]);
      this.canvas.add(this.selectedObjects[0]);

      // simply delete the group
      this.canvas.remove(group);
      this.selectedObjects = [];
      this.canvasSelectionCleared();
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }

  isHyperLinkSelected() {
    return this.selectedObjects.length > 0 && this.selectedObjects[0].get('hyperLinkGroup');
  }

  pencilPressed() {
    this.selectedTool = this.drawToolSelected = 'pencil';
    if (this.selectedObjects.length > 0) {
      if (this.selectedObjects[0].get('type') === 'path') {
        this.selectedPencilWidth = this.selectedObjects[0].strokeWidth;
        this.selectedPencilColor = this.selectedObjects[0].stroke;
      }
    }
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.width = this.selectedPencilWidth ? this.selectedPencilWidth : this.pencilWidth;
    this.canvas.freeDrawingBrush.color = this.selectedPencilColor ? this.selectedPencilColor : this.pencilColor;
  }

  markerPressed() {
    this.selectedTool = this.drawToolSelected = 'marker';
    if (this.selectedObjects.length > 0) {
      if (this.selectedObjects[0].get('type') === 'path') {
        this.selectedMarkerWidth = this.selectedObjects[0].strokeWidth;
        const {color, opacity} = this.rgbaToHex(this.selectedObjects[0].stroke);
        this.selectedMarkerColor = color;
        this.selectedMarkerOpacity = this.round(opacity, 1);
      }
    }
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.width = this.selectedMarkerWidth ? this.selectedMarkerWidth : this.markerWidth;
    this.canvas.freeDrawingBrush.color = this.selectedMarkerColor ?
      this.hexToRgba(this.selectedMarkerColor, this.selectedMarkerOpacity ? this.selectedMarkerOpacity : this.markerOpacity!)
      : this.hexToRgba(this.markerColor, this.markerOpacity!);
  }

  bucketPressed() {
    this.selectedTool = this.drawToolSelected = 'bucket';
    this.canvas.set('defaultCursor', 'crosshair');
  }

  uploadImage() {
    const previousTool = this.selectedTool;
    this.isUploadImageDialogOpened = true;
    this.selectedTool = '';
    const dialogRef = this.dialog.open(UploadImageDialog, {
      data: {},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isUploadImageDialogOpened = false;
      this.selectedTool = previousTool;
      if (result) {
        fabric.Image.fromURL(result, (img: any) => {
          this.canvas.add(img);
          if (img.height * img.scaleY > this.canvasHeight) {
            img.scaleToHeight(this.canvasHeight - 20);
          }
          if (img.width * img.scaleX > this.canvasWidth) {
            img.scaleToWidth(this.canvasHeight - 20);
          }
          this.canvas.centerObject(img);
          this.selectItemAfterAdded(img);
        });
      }
    });
  }

  private canvasMouseDown(o: any) {
    // we need to check if user is not trying to visit a hyperlink
    if (o.e.ctrlKey) {
      if (o.target && o.target.get('type') === 'group') {
        this.selectedObjects = [];
        this.canvasSelectionCleared();
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        o.e.preventDefault();
        o.e.stopPropagation();
        setTimeout(() => {
          this.visitHyperlink(o.target);
        }, 200);
        return;
      }
    }
    if (this.panHandStarting) {
      this.panHandStarted = true;
      this.canvas.set('defaultCursor', 'grabbing');
      this.panX = o.e.screenX;
      this.panY = o.e.screenY;
      return;
    }
    // don't allow creation of text object inside text object
    if (this.selectedTool === 'text' && o.target && (o.target.get('type') === 'textbox' || o.target.get('type') === 'group')) {
      return;
    }
    if (this.selectedTool === 'bucket') {
      if (o.target) {
        const objectType = o.target.get('type');
        if (objectType === 'line') {
          o.target.set('stroke', this.selectedBucketColor ? this.selectedBucketColor : this.bucketColor);
        } else {
          o.target.set('fill', this.selectedBucketColor ? this.selectedBucketColor : this.bucketColor);
        }
      } else if (this.allowBackgroundChange) {
        this.bgColor = this.selectedBucketColor ? this.selectedBucketColor : this.bucketColor;
      }
      this.canvas.requestRenderAll();
      return;
    }
    const pointer = this.canvas.getPointer(o.e);
    if (this.selectedTool === 'text') {
      const text = new fabric.Textbox('', {
        left: pointer.x,
        top: pointer.y,
        fontFamily: this.textFont,
        angle: 0,
        fill: this.textColor,
        fontWeight: this.fontStyles.indexOf('bold') !== -1 ? 'bold' : '',
        fontStyle: this.fontStyles.indexOf('italic') !== -1 ? 'italic' : 'normal',
        underline: this.fontStyles.indexOf('underline') !== -1,
        linethrough: this.fontStyles.indexOf('linethrough') !== -1,
        hasRotatingPoint: true,
        fontSize: this.textSize,
        textAlign: this.textAlign,
      });
      this.canvas.add(text).setActiveObject(text);
      text.enterEditing();
      this.canvas.requestRenderAll();
      return;
    }
    if (!this.isFigureSelected()) {
      return;
    }
    this.mouseDown = true;
    this.startX = this.endX = pointer.x;
    this.startY = this.endY = pointer.y;
    const options: any = {
      originX: 'left',
      originY: 'top',
      width: 1,
      height: 1,
      left: this.startX,
      top: this.startY,
      strokeWidth: this.figureStokeWidth,
      stroke: this.figureStrokeColor,
      fill: null,
      transparentCorners: false
    };
    switch (this.selectedTool) {
      // @ts-ignore
      case 'filled-square':
      // @ts-ignore
      case 'filled-rectangle':
        options.fill = this.figureFillColor;
      case 'square':
      case 'rectangle':
        options.angle = 0;
        this.drawingFigure = new fabric.Rect(options);
        break;
      // @ts-ignore
      case 'filled-circle':
        options.fill = this.figureFillColor;
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
        options.fill = this.figureFillColor;
      case 'triangle':
        this.drawingFigure = new fabric.Triangle(options);
        break;
      // @ts-ignore
      case 'filled-hexagon':
        options.fill = this.figureFillColor;
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
  }

  private canvasMouseMove(o: any) {
    if (this.panHandStarted) {
      this.canvas.relativePan({x: o.e.screenX - this.panX, y: o.e.screenY - this.panY});
      this.panX = o.e.screenX;
      this.panY = o.e.screenY;
      return;
    }
    if (!this.mouseDown) {
      return;
    }
    const pointer = this.canvas.getPointer(o.e);
    this.endX = pointer.x;
    this.endY = pointer.y;

    if (this.startX > this.endX) {
      this.drawingFigure.set({left: Math.abs(this.endX)});
    }
    if (this.startY > this.endY) {
      this.drawingFigure.set({top: Math.abs(this.endY)});
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
    this.canvas.requestRenderAll();
  }

  private canvasMouseUp(o: any) {
    if (this.panHandStarted) {
      this.panHandStarted = false;
      this.canvas.set('defaultCursor', 'grab');
      return;
    }
    this.panHandStarting = false;
    if (this.selectedTool === 'text') {
      return;
    }
    this.canvas.set('defaultCursor', 'default');
    this.mouseDown = false;
    if (this.isFigureSelected()) {
      this.drawingFigure = null;
      this.selectedTool = 'pointer';
      this.canvas.set({selection: true});
    }
  }

  private canvasMouseDblclick(o: any) {
    const obj = o.target;
    if (obj) {
      if (obj.get('type') === 'line') {
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
        obj.set({
          x1: x1 - obj.strokeWidth / 2,
          y1: y1 - obj.strokeWidth / 2,
          x2: x2 - obj.strokeWidth / 2,
          y2: y2 - obj.strokeWidth / 2,
        });
        obj.setCoords();
        const p1 = new fabric.Circle({
          // @ts-ignore
          id: 'line-pointer-1',
          radius: obj.strokeWidth * 3,
          fill: this.toolsColor,
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
          fill: this.toolsColor,
          top: y2,
          left: x2,
          originX: 'center',
          originY: 'center',
          hasBorders: false,
          hasControls: false
        });
        this.canvas.add(p1, p2);
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
        obj.set('doubleClicked', true);
      }
    } else {
      this.canvas.getObjects('line').every((lineObj: any) => {
        lineObj.set('doubleClicked', false);
      });
      const linePointer1 = this.canvas.getObjects().find((obj: any) => obj.id === 'line-pointer-1');
      if (linePointer1) {
        this.canvas.remove(linePointer1);
      }
      const linePointer2 = this.canvas.getObjects().find((obj: any) => obj.id === 'line-pointer-2');
      if (linePointer2) {
        this.canvas.remove(linePointer2);
      }
      this.canvas.requestRenderAll();
    }
  }

  private canvasObjectMoving(o: any) {
    const obj = o.target;
    if (obj.id === 'line-pointer-1' || obj.id === 'line-pointer-2') {
      this.canvas.getObjects('line').every((lineObj: any) => {
        if (lineObj.doubleClicked) {
          lineObj.set({
            x1: obj.id === 'line-pointer-1' ? obj.left : lineObj.x1,
            y1: obj.id === 'line-pointer-1' ? obj.top : lineObj.y1,
            x2: obj.id === 'line-pointer-2' ? obj.left : lineObj.x2,
            y2: obj.id === 'line-pointer-2' ? obj.top : lineObj.y2,
          });
          lineObj.setCoords();
          return false;
        }
        return true;
      });
    }
  }

  private canvasSelectionCreated(o: any) {
    if (o.selected.length > 0) {
      this.selectedObjects = o.selected;
      let objectType = this.selectedObjects[0].get('type');
      // if it is a hyperlink, take the properties of the textbox
      if (objectType === 'group') {
        objectType = 'textbox';
        this.selectedObjects[0] = this.getTextboxFromGroup(this.selectedObjects[0]);
      }
      if (objectType === 'ellipse' || objectType === 'rect' || objectType === 'triangle'
        || objectType === 'polygon' || objectType === 'line') {
        this.selectedFigureStrokeColor = this.selectedObjects[0].stroke;
        this.selectedFigureStokeWidth = this.selectedObjects[0].strokeWidth;
      }
      if (objectType === 'ellipse' || objectType === 'rect' || objectType === 'triangle'
        || objectType === 'polygon') {
        this.selectedFigureFillColor = this.selectedObjects[0].fill;
      }
      if (objectType === 'textbox') {
        this.selectedTextColor = this.selectedObjects[0].fill;
        this.selectedTextSize = this.selectedObjects[0].fontSize;
        this.selectedTextFont = this.selectedObjects[0].fontFamily;
        this.selectedFontStyles = [];
        if (this.selectedObjects[0].fontWeight === 'bold') {
          this.selectedFontStyles.push('bold');
        }
        if (this.selectedObjects[0].fontStyle === 'italic') {
          this.selectedFontStyles.push('italic');
        }
        if (this.selectedObjects[0].underline === true) {
          this.selectedFontStyles.push('underline');
        }
        if (this.selectedObjects[0].linethrough === true) {
          this.selectedFontStyles.push('linethrough');
        }
        this.selectedTextAlign = this.selectedObjects[0].textAlign;
      }
      // NOTE we can't determine for free drawing from the path object
      // whether user is using it as pencil or marker, so when the corresponding menu is opened
      // we there set the appropriate values
    }
  }

  private canvasSelectionCleared() {
    this.selectedObjects = [];
    this.selectedFigureStrokeColor = '';
    this.selectedFigureFillColor = '';
    this.selectedFigureStokeWidth = 0;
    this.selectedTextColor = '';
    this.selectedTextSize = 0;
    this.selectedTextFont = '';
    this.selectedFontStyles = null;
    this.selectedTextAlign = '';
    this.selectedPencilColor = '';
    this.selectedPencilWidth = 0;
    this.selectedMarkerColor = '';
    this.selectedMarkerWidth = 0;
    this.selectedMarkerOpacity = 0;
    this.selectedBucketColor = '';
  }

  private canvasTextChanged(o: any) {
    if (o.target instanceof fabric.IText) {
      const text = o.target.text || ''
      while (o.target.textLines.length > text.split('\n').length) {
        o.target.set({width: o.target.getScaledWidth() + 1});
      }
    }
  }

  private selectItemAfterAdded(obj: any) {
    this.canvas.discardActiveObject();
    this.canvas.setActiveObject(obj);
    this.canvas.requestRenderAll();
  }

  private hexToRgba(hex: string, alpha: number) {
    alpha = this.round(alpha, 1);
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
      `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : hex;
  }

  private rgbaToHex(rgba: string) {
    const rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    let alpha = (rgb && rgb[4] || '').trim();
    let hex: any = rgb ?
      // @ts-ignore
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      // @ts-ignore
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      // @ts-ignore
      (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;

    let alphaNumber: number;
    if (alpha === '') {
      alphaNumber = 1;
    } else {
      alphaNumber = parseFloat(alpha);
    }

    return {color: `#${hex}`, opacity: alphaNumber};
  }

  private round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  private getTextboxFromGroup(group: any) {
    let text = null;
    group.forEachObject((obj: any) => {
      if (obj.get('type') == 'textbox') {
        text = obj;
      }
    });
    return text;
  }
}
