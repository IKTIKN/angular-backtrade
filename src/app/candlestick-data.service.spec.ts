import { TestBed } from '@angular/core/testing';

import { CandlestickDataService } from './candlestick-data.service';

describe('CandlestickDataService', () => {
  let service: CandlestickDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandlestickDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
