import { Component, OnInit } from '@angular/core';
import { CandlestickDataService } from 'src/app/services/candlestick-data.service';

@Component({
  selector: 'app-all-markets',
  templateUrl: './all-markets.component.html',
  styleUrls: ['./all-markets.component.css']
})
export class AllMarketsComponent implements OnInit {

  displayedColumns: string[] = ['Symbol', 'Price', 'Low', 'High', 'Change', 'Change %', 'Volume'];
  
  constructor(public data: CandlestickDataService) { }
  dataSource = this.data.tickers24h;

  ngOnInit(): void {
    
  }

}
