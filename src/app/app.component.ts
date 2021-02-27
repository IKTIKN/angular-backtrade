import { Component } from '@angular/core';
import { BinanceDataService } from './services/binance-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backtrade';

  constructor(public binance: BinanceDataService) {}

  ngOnInit() {
    this.binance.setBinanceExchangeInfo();
  }
}
