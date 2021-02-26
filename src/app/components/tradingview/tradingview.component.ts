import { Component, OnInit } from '@angular/core';
import { BinanceDataService } from 'src/app/services/binance-data.service';

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.css']
})
export class TradingviewComponent implements OnInit {
  title = 'Tradingview';

  constructor(public binance: BinanceDataService) { }

  ngOnInit(): void {
    this.binance.initializeTradingView(this.binance.selectedSymbol, this.binance.selectedInterval);
  }

}
