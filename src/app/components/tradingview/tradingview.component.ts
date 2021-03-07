import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BinanceDataService } from 'src/app/services/binance-data.service';

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.css']
})
export class TradingviewComponent implements OnInit {
  title = 'Tradingview';


  constructor(
    public binance: BinanceDataService,
    private route: ActivatedRoute,
  ) { }
  
  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params.symbol);
      this.binance.initializeTradingView(params.symbol, params.interval);
    });
  }

}
