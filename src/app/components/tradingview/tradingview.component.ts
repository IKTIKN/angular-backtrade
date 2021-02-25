import { Component, OnInit } from '@angular/core';
import { BinanceDataService } from 'src/app/services/binance-data.service';
import { CandlestickDataService } from 'src/app/services/candlestick-data.service';


@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.css']
})
export class TradingviewComponent implements OnInit {
  title = 'Tradingview';

  constructor(public data: CandlestickDataService, public binance: BinanceDataService) { }

  ngOnInit(): void {
    this.data.setTradingView(this.data.selectedSymbol, '30m');
  }

}
