import { TestBed } from '@angular/core/testing';

import { TooltipDataService } from './tooltip-data.service';

describe('TooltipDataService', () => {
  let service: TooltipDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TooltipDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
