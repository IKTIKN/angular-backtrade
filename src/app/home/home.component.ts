import { Component, OnInit } from '@angular/core';
import { BinanceDataService } from '../binance-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public binance: BinanceDataService) { }

  ngOnInit(): void {
  }

}
