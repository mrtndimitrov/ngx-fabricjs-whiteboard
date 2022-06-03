import { TestBed } from '@angular/core/testing';

import { NgxFabricjsWhiteboardService } from './ngx-fabricjs-whiteboard.service';

describe('NgxFabricjsWhiteboardService', () => {
  let service: NgxFabricjsWhiteboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFabricjsWhiteboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
