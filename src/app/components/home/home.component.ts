import { Component, OnInit } from '@angular/core';
import { BinanceDataService } from 'src/app/services/binance-data.service';

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
