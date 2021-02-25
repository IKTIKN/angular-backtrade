import { Injectable } from '@angular/core';
import { IAssets } from '../interfaces/assets';
import { IExchangeInformation } from '../interfaces/exchangeinformation';
import { ISymbol } from '../interfaces/symbol';
import { ITicker24h } from '../interfaces/ticker24h';
import { BinanceApiService } from './binance-api.service';


@Injectable({
  providedIn: 'root'
})
export class BinanceDataService {

  exchangeInfoLoaded: boolean = false;
  exchangeInfo: IExchangeInformation;
  
  tickerLoaded = false;
  tickersLoaded = false;

  currentTicker24h: ITicker24h;
  tickers24h: ITicker24h[];

  assets: IAssets;

  constructor(private api: BinanceApiService) { }

  setBinanceExchangeInfo(): void {
    this.api.getExchangeInformation().subscribe(
      (info: IExchangeInformation) => {
        this.exchangeInfo = info;
        this.assets = this.extractAllAssets();
        this.exchangeInfoLoaded = true;
        console.log(this.assets)
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
}
