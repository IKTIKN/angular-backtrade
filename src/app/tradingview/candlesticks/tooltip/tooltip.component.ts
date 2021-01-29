import { Component, Input, OnInit } from '@angular/core';
import { TooltipDataService } from 'src/app/tooltip-data.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  currentPrice = 0;

  constructor(public tooltipData: TooltipDataService) { }

  ngOnInit(): void {
    console.log(this.tooltipData.data);

  }

  updatePrice(): number {
    return this.tooltipData.openPrice;
  }
}
