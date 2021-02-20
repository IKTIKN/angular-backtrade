import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TooltipDataService } from './tooltip-data.service';


@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {
  binance = 'https://api.binance.com'
  endpoint = '/api/v3/klines?limit=1000&interval=1w&symbol=DOGEUSDT';
  url = 'assets/candlestickdata/btcusdt5m.json';
  testUrl = 'assets/candlestickdata/test.json';

  echartCandlesticks = [];
  echartOpenTimes = [];
  echartOpenPrices = [];
  echartVolumes = [];

  binanceCandlesticks = [];
  constructor(private http: HttpClient, private tooltip: TooltipDataService) { }

  private getCandlestickData(): Observable<ICandlestick[]> {
    return this.http.get<ICandlestick[]>(this.binance+this.endpoint);
  }

  private setFirstTooltipData(candlesticks: ICandlestick[]): void {
    this.tooltip.setBinanceData(candlesticks.reverse());
  }


  generateEchart(): void {

    if (this.echartCandlesticks.length == 0) {

      this.getCandlestickData().subscribe(
        
        (candlesticks: ICandlestick[]) => {
          for (var i = 0; i<candlesticks.length; i++) {
            var c: ICandlestick = candlesticks[i];
            this.echartCandlesticks.push([c[1], c[4], c[2], c[3]]);
            this.echartOpenTimes.push(new Date(c[0]).toLocaleDateString());
            // this.echartOpenPrices.push(c[1]);
            this.echartVolumes.push([i, c[5], c[1] > c[4] ? -1 : 1 ]);

            this.binanceCandlesticks.push(c);
          }
          this.setFirstTooltipData(candlesticks);
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
