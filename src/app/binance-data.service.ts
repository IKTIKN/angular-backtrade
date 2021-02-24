import { Injectable } from '@angular/core';
import { BinanceApiService, IExchangeInformation, ISymbol } from './binance-api.service';

@Injectable({
  providedIn: 'root'
})
export class BinanceDataService {

  exchangeInfoLoaded: boolean = false;
  exchangeInfo: IExchangeInformation;
  
  quoteAssets: string[];

  constructor(private api: BinanceApiService) { }

  setBinanceExchangeInfo(): void {
    this.api.getExchangeInformation().subscribe(
      (info: IExchangeInformation) => {
        this.exchangeInfo = info;
        this.quoteAssets = this.extractAllQuoteAssets();
        this.exchangeInfoLoaded = true;
      }
    );
  }

  private extractAllQuoteAssets(): string[] {
    let quoteAssets: string[] = [];
    this.exchangeInfo.symbols.forEach(
      (symbol: ISymbol) => {
        if (quoteAssets.indexOf(symbol.quoteAsset) < 0) {
          quoteAssets.push(symbol.quoteAsset);
        }
      }
    );
    console.log(quoteAssets)
    return quoteAssets;
  }
}
