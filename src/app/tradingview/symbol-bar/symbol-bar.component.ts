import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-bar',
  templateUrl: './symbol-bar.component.html',
  styleUrls: ['./symbol-bar.component.css']
})
export class SymbolBarComponent implements OnInit {

  symbol = 'BTCUSDT';
  constructor() { }

  ngOnInit(): void {
  }

}
