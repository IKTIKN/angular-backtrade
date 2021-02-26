import { Component, Input, OnInit } from '@angular/core';
import { ICandlestick } from 'src/app/interfaces/candlestick';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input() candlestick: ICandlestick;
  
  constructor() { }

  ngOnInit(): void {
  }

  isBullish(): boolean {
    return this.candlestick.open < this.candlestick.close;
  }

}