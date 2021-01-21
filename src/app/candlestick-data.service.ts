import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {
  binance = 'https://api.binance.com'
  endpoint = '/api/v3/klines?limit=1000&interval=1h&symbol=BTCUSDT';
  url = 'assets/candlestickdata/btcusdt5m.json';
  testUrl = 'assets/candlestickdata/test.json';

  echartCandlesticks = [];
  echartOpenTimes = [];
  echartOpenPrices = [];
  echartVolumes = [];

  constructor(private http: HttpClient) { }

  private getCandlestickData(): Observable<ICandlestick[]> {
    return this.http.get<ICandlestick[]>(this.url)
  }

  generateEchart(): void {

    if (this.echartCandlesticks.length == 0) {

      this.getCandlestickData().subscribe(
        
        (candlesticks: ICandlestick[]) => {
          for (var i = 0; i<candlesticks.length; i++) {
            var c: ICandlestick = candlesticks[i];
            this.echartCandlesticks.push([c[1], c[4], c[2], c[3]]);
            this.echartOpenTimes.push(new Date(c[0]).toLocaleDateString());
            this.echartOpenPrices.push(c[1]);
            this.echartVolumes.push([i, c[5], c[1] > c[4] ? -1 : 1 ]);
          }
        }

      );
    }
    
  }

}


export interface ICandlestick {
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteAssetVolume: string,
  trades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
  ignore: string
}
