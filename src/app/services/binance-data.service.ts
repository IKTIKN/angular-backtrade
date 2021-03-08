import { Injectable } from '@angular/core';
import { IAssets } from '../interfaces/assets';
import { ICandlestick } from '../interfaces/candlestick';
import { IExchangeInformation } from '../interfaces/exchangeinformation';
import { ISymbol } from '../interfaces/symbol';
import { ITicker24h } from '../interfaces/ticker24h';
import { BinanceApiService } from './binance-api.service';

@Injectable({
  providedIn: 'root'
})
export class BinanceDataService {

  selectedSymbol: ISymbol;
  selectedInterval = '1h'

  selectedQuoteMarket = 'USDT'
  
  exchangeInfoLoaded: boolean = false;
  exchangeInfo: IExchangeInformation;
  
  currentTickerLoaded: boolean = false;
  currentTicker24h: ITicker24h;

  tickersLoaded: boolean = false;
  tickers24h: ITicker24h[];

  echartLoaded: boolean = false;


  assets: IAssets;

  echartCandlesticks: string[][];
  echartOpenTimes: string[];
  echartVolumes: any[];


  binanceCandlesticks: ICandlestick[];


  constructor(
    private api: BinanceApiService,
  ) { }

  
  initializeMarketView(): void {
    this.tickersLoaded = false;
    this.setTickers24h();
  }


  initializeTradingView(symbol: string, interval: string): void {
    this.selectedSymbol = this.setSymbol(symbol);
    this.selectedInterval = interval;
    this.echartLoaded = false;
    this.currentTickerLoaded = false;
    this.setTickers24h();

    this.setTicker24h(this.selectedSymbol.symbol);
    this.generateEchart(this.selectedSymbol.symbol, interval);
    
  }


  setSymbol(symbol: string): ISymbol{
    let selectedSymbol: ISymbol;
    this.exchangeInfo.symbols.forEach(
      s => {
        if (s.symbol === symbol) {
          selectedSymbol = s
        }
    });
    if (!selectedSymbol) {
      selectedSymbol = this.exchangeInfo.symbols[0];
    }
    console.log(selectedSymbol)
    return selectedSymbol;
  }


  setBinanceExchangeInfo(): void {
    this.api.getExchangeInformation().subscribe(
      (info: IExchangeInformation) => {
        this.exchangeInfo = info;
        this.selectedSymbol = this.setSymbol('BTCUSDT');
        this.assets = this.extractAllAssets();
        this.exchangeInfoLoaded = true;
        console.log(this.assets.quoteAssets)
      }
    );
  }

  
  private extractAllAssets(): IAssets {
    let quoteAssets: string[] = [];
    let baseAssets: string[] = [];
    this.exchangeInfo.symbols.forEach(
      (symbol: ISymbol) => {
        if (quoteAssets.indexOf(symbol.quoteAsset) < 0) {
          quoteAssets.push(symbol.quoteAsset);
        }
        if (baseAssets.indexOf(symbol.baseAsset) < 0) {
          baseAssets.push(symbol.baseAsset);
        }
      }
    );
    return {baseAssets, quoteAssets};
  }


  private setTicker24h(symbol: string): void {
    this.api.get24hTicker(symbol).subscribe(
      (ticker: ITicker24h) => {
        this.currentTicker24h = ticker;
        this.currentTickerLoaded = true;
      }
    );
  }


  private setTickers24h(): void {
    this.api.getAll24hTickers().subscribe(
      (tickers: ITicker24h[]) => {
        this.tickers24h = tickers;
        this.tickersLoaded = true;
      }
    );
  }


  private generateEchart(symbol: string, interval: string): void {
    this.resetData();
    this.api.getCandlestickData(symbol, interval).subscribe(
      (candlestickData: any[]) => {
        candlestickData.forEach(
          candlestick => {
            this.binanceCandlesticks.push(this.candlestickObjectBuilder(candlestick))
          }
        )
      this.setEchart(this.binanceCandlesticks);
      }
    );
  }


  private resetData() {
    this.echartCandlesticks = [];
    this.echartOpenTimes = [];
    this.echartVolumes = [];
    this.binanceCandlesticks = [];
  }
  

  private setEchart(candlesticks: ICandlestick[]): void {
    candlesticks.forEach(
      c => {
        this.echartCandlesticks.push([c.open, c.close, c.high, c.low]);
        this.echartOpenTimes.push(new Date(c.openTime).toLocaleDateString());
        this.echartVolumes.push([candlesticks.indexOf(c), c.volume, c.open > c.close ? -1 : 1 ]);
      }
    );
    this.echartLoaded = true
  }

  // ????
  private candlestickObjectBuilder(candlestickArray: any[]): ICandlestick {
    let candlestickObj: ICandlestick = {
      'openTime': candlestickArray[0],
      'open': candlestickArray[1],
      'high': candlestickArray[2],
      'low': candlestickArray[3],
      'close': candlestickArray[4],
      'volume': candlestickArray[5],
      'closeTime': candlestickArray[6],
      'quoteAssetVolume': candlestickArray[7],
      'trades': candlestickArray[8],
      'takerBuyBaseAssetVolume': candlestickArray[9],
      'takerBuyQuoteAssetVolume': candlestickArray[10],
      'ignore': candlestickArray[11]
    };

    return candlestickObj
  }
}