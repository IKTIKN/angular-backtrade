import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICandlestick } from './candlestick-data.service';

@Injectable({
  providedIn: 'root'
})
export class BinanceApiService {

  private baseUrl = 'https://api.binance.com';

  endpoint = '/api/v3/klines?limit=1000&interval=15m&symbol=DOGEUSDT';
  url = 'assets/candlestickdata/btcusdt5m.json';
  testUrl = 'assets/candlestickdata/LTCUSDT_1d.json';

  constructor(private http: HttpClient) { }

  getCandlestickData(symbol: string, interval: string): Observable<ICandlestick[]> {
    const requestUrl = `/api/v3/klines?limit=1000&interval=${interval}&symbol=${symbol}`;
    return this.http.get<ICandlestick[]>(this.baseUrl + requestUrl);
  }

}
