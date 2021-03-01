import { Component, Input, OnInit } from '@angular/core';
import { ISymbol } from 'src/app/interfaces/symbol';
import { ITicker24h } from 'src/app/interfaces/ticker24h';

@Component({
  selector: 'app-symbol-bar',
  templateUrl: './symbol-bar.component.html',
  styleUrls: ['./symbol-bar.component.css']
})
export class SymbolBarComponent implements OnInit {
  
  @Input() ticker24h: ITicker24h;
  @Input() symbol: ISymbol;
  
  displayedColumns: string[] = ['symbol', 'lastPrice', 'priceChangePercent', 'quoteVolume'];
  decimalFormat: string;
  showMarkets: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    this.decimalFormat = this.setDecimalFormat()
  }


  setDecimalFormat(): string {
    let decimalFormat: number = 0;
    let minPrice: number = +this.symbol.filters[0].minPrice;
    while(minPrice != 1) {
      minPrice *= 10;
      decimalFormat += 1;
    }
    return `1.${decimalFormat}-${decimalFormat}`;
  }
}
