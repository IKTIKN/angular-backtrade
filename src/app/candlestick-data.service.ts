import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TooltipDataService } from './tooltip-data.service';
import { TaService } from './ta.service';


@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {
  binance = 'https://api.binance.com'
  endpoint = '/api/v3/klines?limit=1000&interval=15m&symbol=DOGEUSDT';
  url = 'assets/candlestickdata/btcusdt5m.json';
  testUrl = 'assets/candlestickdata/LTCUSDT_1d.json';

  dataLoaded = false;
  echartCandlesticks = [];
  echartOpenTimes = [];
  echartOpenPrices = [];
  echartVolumes = [];

  echartSlowSMA: number[];
  echartSMA: number[];
  echartFastSMA: number[];

  binanceCandlesticks = [];

  constructor(private http: HttpClient, private tooltip: TooltipDataService, private ta: TaService) { }

  private getCandlestickData(symbol: string, interval: string): Observable<ICandlestick[]> {
    return this.http.get<ICandlestick[]>(this.binance + '/api/v3/klines?limit=1000&interval=' + interval + '&symbol=' + symbol);
  }

  private setFirstTooltipData(candlesticks: ICandlestick[]): void {
    this.tooltip.setBinanceData(candlesticks.reverse());
  } 

  private resetData() {
    this.echartCandlesticks = [];
    this.echartOpenTimes = [];
    this.echartVolumes = [];
    this.binanceCandlesticks = [];
    this.echartSMA = [];
    this.echartSlowSMA = [];
    this.echartFastSMA = [];
  }

  generateEchart(symbol: string, interval: string): void {
    this.dataLoaded = false;
    this.resetData();

    this.getCandlestickData(symbol, interval).subscribe(
      
      (candlesticks: ICandlestick[]) => {

        this.binanceCandlesticks = candlesticks;
        this.echartSMA = this.ta.SimpleMovingAverage(candlesticks, 25);
        this.echartFastSMA = this.ta.SimpleMovingAverage(candlesticks, 7);
        this.echartSlowSMA = this.ta.SimpleMovingAverage(candlesticks, 99);

        for (var i = 0; i<candlesticks.length; i++) {
          var c: ICandlestick = candlesticks[i];
          this.echartCandlesticks.push([c[1], c[4], c[2], c[3]]);
          this.echartOpenTimes.push(new Date(c[0]).toLocaleDateString());
          // this.echartOpenPrices.push(c[1]);
          this.echartVolumes.push([i, c[5], c[1] > c[4] ? -1 : 1 ]);
        }

        this.setFirstTooltipData(candlesticks);
        this.dataLoaded = true;
      }
    );
    
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
