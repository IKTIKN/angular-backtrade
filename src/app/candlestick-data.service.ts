import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TooltipDataService } from './tooltip-data.service';
import { TaService } from './ta.service';
import { BinanceApiService, ITicker, ITicker24h } from './binance-api.service';


@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {

  selectedSymbol = 'BTCUSDT';
  selectedInterval = '30m'

  dataLoaded = false;

  ticker24h: ITicker24h;

  echartCandlesticks = [];
  echartOpenTimes: string[];
  echartVolumes: any[];
  echartSlowSMA: number[];
  echartSMA: number[];
  echartFastSMA: number[];
  binanceCandlesticks = [];

  constructor(
    private tooltip: TooltipDataService,
    private ta: TaService,
    private api: BinanceApiService
    ) { }


  private resetData() {
    this.echartCandlesticks = [];
    this.echartOpenTimes = [];
    this.echartVolumes = [];
    this.binanceCandlesticks = [];
    this.echartSMA = [];
    this.echartSlowSMA = [];
    this.echartFastSMA = [];
  }

  setTradingView(symbol: string, interval: string): void {
    this.setSymbolBar(symbol);
    this.generateEchart(symbol, interval);
  }

  private setSymbolBar(symbol: string): void {
    this.api.get24hTicker(symbol).subscribe(
      (ticker: ITicker24h) => {
        this.ticker24h = ticker;
      }
    );
  }


  private generateEchart(symbol: string, interval: string): void {
    this.dataLoaded = false;
    this.resetData();

    this.api.getCandlestickData(symbol, interval).subscribe(
      
      (candlesticks: ICandlestick[]) => {

        this.binanceCandlesticks = candlesticks;
        this.echartSMA = this.ta.SimpleMovingAverage(candlesticks, 25);
        this.echartFastSMA = this.ta.SimpleMovingAverage(candlesticks, 7);
        this.echartSlowSMA = this.ta.SimpleMovingAverage(candlesticks, 99);

        for (let i = 0; i<candlesticks.length; i++) {
          let c: ICandlestick = candlesticks[i];
          
          this.echartCandlesticks.push([c[1], c[4], c[2], c[3]]);
          this.echartOpenTimes.push(new Date(c[0]).toLocaleDateString());
          this.echartVolumes.push([i, c[5], c[1] > c[4] ? -1 : 1 ]);
        }

        this.tooltip.setFirstTooltipData(candlesticks);
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
