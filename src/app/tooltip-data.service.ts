import { Injectable } from '@angular/core';
import { ICandlestick } from './candlestick-data.service';

@Injectable({
  providedIn: 'root'
})
export class TooltipDataService {

  data: any;
  openPrice: number;
  closePrice: number;
  lowPrice: number;
  highPrice: number;

  volume: number;
  index: number;
  movementIndicator: number;
  
  // zet deze onzin in een object 
  binanceOpenTime: number;
  binanceOpenPrice: number;
  binanceHighPrice: number;
  binanceLowPrice: number;
  binanceClosePrice: number;
  binanceClosetime: number;
  binanceVolume: number;
  binanceQuoteVolume: number;
  binanceTrades: number;

  constructor() { }

  setBinanceData(binanceData: ICandlestick[]) {
    console.log(binanceData[this.index][5], binanceData[this.index][7], binanceData[this.index][8]);
    this.binanceOpenTime = binanceData[this.index][0];
    this.binanceOpenPrice = binanceData[this.index][1];
    this.binanceHighPrice = binanceData[this.index][2];
    this.binanceLowPrice = binanceData[this.index][3];
    this.binanceClosePrice = binanceData[this.index][4];
    this.binanceVolume = binanceData[this.index][5];
    this.binanceQuoteVolume = binanceData[this.index][7];
    this.binanceTrades = binanceData[this.index][8];

  }

  setTooltipData(tooltipData: ITooltipData[]) {
    let candlestickIndex = 0;
    let volumeIndex = 0;
    
    // this.data = tooltipData;

    // this.logTooltip(tooltipData[0]);
    for (let x=0; x<tooltipData.length; x++) {
      // if (tooltipData[x].seriesType == 'candlestick') {
      //   candlestickIndex = x;
      // }
      if (tooltipData[x].seriesType == 'bar') {
        volumeIndex = x;
      }
    }

    // this.openPrice = tooltipData[candlestickIndex].data[1];
    // this.closePrice = tooltipData[candlestickIndex].data[2];
    // this.highPrice = tooltipData[candlestickIndex].data[3];
    // this.lowPrice = tooltipData[candlestickIndex].data[4];
    
    this.index = tooltipData[volumeIndex].data[0];
    // this.volume = tooltipData[volumeIndex].data[1];
    this.movementIndicator = tooltipData[volumeIndex].data[2];
  }

  logTooltip(data: ITooltipData) {
    console.log(
      `
AxisDim: ${data.axisDim}
axisId: ${data.axisId}
axisIndex: ${data.axisIndex}
axisType: ${data.axisType}
axisValue: ${data.axisValue}
axisValueLabel: ${data.axisValueLabel}
borderColor: ${data.borderColor}
color: ${data.color}
componentIndex: ${data.componentIndex}
componentSubType: ${data.componentSubType}
componentType: ${data.componentType}
data: ${data.data}
dataIndex: ${data.dataIndex}
dataType: ${data.dataType}
encode: ${data.encode}
marker: ${data.marker}
name: ${data.name}
seriesId: ${data.seriesId}
seriesIndex: ${data.seriesIndex}
seriesName: ${data.seriesName}
seriesType: ${data.seriesType}
value: ${data.value}
percent: ${data.percent}
      `
      );
  }
}


export interface ITooltipData {
  axisDim: string,
  axisId: string,
  axisIndex: number,
  axisType: string,
  axisValue: string,
  axisValueLabel: string,
  borderColor: string,
  color: string,
  componentIndex: number,
  componentSubType: string,
  componentType: 'series',
  data: Array<any>,
  dataIndex: number,
  dataType: any,
  dimensionNames: Array<string>,
  encode: Object,
  marker: string,
  name: string,
  seriesId: string,
  seriesIndex: number,
  seriesName: string,
  seriesType: string,
  value: Array<any>,
  percent: number,
}

