import { Injectable, Input } from '@angular/core';
import { ICandlestick } from '../interfaces/candlestick';
import { ITooltipData } from '../interfaces/tooltipdata';


@Injectable({
  providedIn: 'root'
})
export class TooltipDataService {
  
  index = 0;
  movementIndicator: -1;
  
  candlestick2: ICandlestick;


  constructor() { }


}