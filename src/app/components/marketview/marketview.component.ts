import { Component, OnInit } from '@angular/core';
import { CandlestickDataService } from 'src/app/services/candlestick-data.service';

@Component({
  selector: 'app-marketview',
  templateUrl: './marketview.component.html',
  styleUrls: ['./marketview.component.css']
})
export class MarketviewComponent implements OnInit {

  constructor(public data: CandlestickDataService) { }

  ngOnInit(): void {
    this.data.setMarketView();
  }

}
