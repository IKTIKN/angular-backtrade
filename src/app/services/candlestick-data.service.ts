import { Injectable } from '@angular/core';
import { TooltipDataService } from './tooltip-data.service';
import { TaService } from './ta.service';
import { BinanceApiService } from './binance-api.service';
import { ITicker24h } from '../interfaces/ticker24h';


@Injectable({
  providedIn: 'root'
})
export class CandlestickDataService {


  constructor(
    private tooltip: TooltipDataService,
    private ta: TaService,
    private api: BinanceApiService
    ) { }



}