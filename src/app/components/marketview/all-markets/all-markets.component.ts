import { Component, Input, OnInit } from '@angular/core';
import { ITicker24h } from 'src/app/interfaces/ticker24h';

@Component({
  selector: 'app-all-markets',
  templateUrl: './all-markets.component.html',
  styleUrls: ['./all-markets.component.css']
})
export class AllMarketsComponent implements OnInit {
  @Input() tickers24h: ITicker24h[];

  displayedColumns: string[] = ['Symbol', 'Price', 'Low', 'High', 'Change', 'Change %', 'Volume'];
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
