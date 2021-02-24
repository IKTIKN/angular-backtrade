import { Component } from '@angular/core';
import { BinanceDataService } from './binance-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backtrade';

  constructor(private binance: BinanceDataService) {}

  ngOnInit() {
    this.binance.setBinanceExchangeInfo();
  }
}
