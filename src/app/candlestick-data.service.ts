import { Injectable } from '@angular/core';
import { TooltipDataService } from './tooltip-data.service';
import { TaService } from './ta.service';
import { BinanceApiService, ITicker24h } from './binance-api.service';


@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {

  selectedSymbol = 'BTCUSDT';
  selectedInterval = '30m'

  dataLoaded = false;
  tickerLoaded = false;
  tickersLoaded = false;

  currentTicker24h: ITicker24h;
  tickers24h: ITicker24h[];

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
    this.selectedSymbol = symbol;
    this.dataLoaded = false;
    this.tickerLoaded = false;
    this.setTicker24h(symbol);
    this.generateEchart(symbol, interval);
  }


  setMarketView(): void {
    this.tickerLoaded = false;
    this.setTickers24h();
  }


  private setTickers24h(): void {
    this.api.getAll24hTickers().subscribe(
      (tickers: ITicker24h[]) => {
        this.tickers24h = tickers;
        this.tickersLoaded = true;
      }
    );
  }


  // private setTicker24h(symbol: string): void {
  //   this.tickers24h.forEach(
  //     (ticker) => {
  //       if (ticker.symbol === symbol) {
  //         this.currentTicker24h = ticker;
  //         this.tickerLoaded = true;
  //       }
  //     }
  //   );
  // }


  private setTicker24h(symbol: string): void {
    this.api.get24hTicker(symbol).subscribe(
      (ticker: ITicker24h) => {
        this.currentTicker24h = ticker;
        this.tickerLoaded = true;
      }
    );
  }


  private generateEchart(symbol: string, interval: string): void {
    // this.dataLoaded = false;
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
