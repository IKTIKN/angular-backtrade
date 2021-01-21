import { Component, OnInit } from '@angular/core';
import { CandlestickDataService, ICandlestick } from '../candlestick-data.service';

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.css']
})
export class TradingviewComponent implements OnInit {
  title = 'Tradingview';

  constructor(private data: CandlestickDataService) { }

  ngOnInit(): void {
    this.data.generateEchart()
  }

}
