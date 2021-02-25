import { Component, OnInit } from '@angular/core';
import { CandlestickDataService } from 'src/app/services/candlestick-data.service';

@Component({
  selector: 'app-symbol-bar',
  templateUrl: './symbol-bar.component.html',
  styleUrls: ['./symbol-bar.component.css']
})
export class SymbolBarComponent implements OnInit {


  constructor(public data: CandlestickDataService) { }

  ngOnInit(): void {
  }

}
