import { Component, OnInit } from '@angular/core';
import { BinanceDataService } from 'src/app/services/binance-data.service';

@Component({
  selector: 'app-marketview',
  templateUrl: './marketview.component.html',
  styleUrls: ['./marketview.component.css']
})
export class MarketviewComponent implements OnInit {

  constructor(public binance: BinanceDataService) { }

  ngOnInit(): void {
    this.binance.initializeMarketView();
  }

}
