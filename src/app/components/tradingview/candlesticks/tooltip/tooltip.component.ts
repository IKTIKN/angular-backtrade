import { Component, Input, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ICandlestick } from 'src/app/interfaces/candlestick';
import { ISymbol } from 'src/app/interfaces/symbol';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input() candlestick: ICandlestick;
  @Input() symbol: ISymbol;
  
  decimalFormat: string;

  constructor() { }

  ngOnInit(): void {
    this.decimalFormat = this.setDecimalFormat();
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


  isBullish(): boolean {
    return this.candlestick.open < this.candlestick.close;
  }

}