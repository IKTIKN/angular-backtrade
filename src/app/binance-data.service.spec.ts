import { TestBed } from '@angular/core/testing';

import { BinanceDataService } from './binance-data.service';

describe('BinanceDataService', () => {
  let service: BinanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
