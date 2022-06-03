import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFabricjsWhiteboardComponent } from './ngx-fabricjs-whiteboard.component';

describe('NgxFabricjsWhiteboardComponent', () => {
  let component: NgxFabricjsWhiteboardComponent;
  let fixture: ComponentFixture<NgxFabricjsWhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFabricjsWhiteboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFabricjsWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
