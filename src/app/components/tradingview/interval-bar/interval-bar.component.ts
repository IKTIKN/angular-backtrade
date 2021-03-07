import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interval-bar',
  templateUrl: './interval-bar.component.html',
  styleUrls: ['./interval-bar.component.css']
})
export class IntervalBarComponent implements OnInit {
  @Input() selectedSymbol: string;
  @Input() selectedInterval: string;

  intervals: string[] = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];

  constructor() { }

  ngOnInit(): void {
  }

}
