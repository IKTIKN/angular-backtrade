import { Injectable } from '@angular/core';
import { BollingerBands } from '../interfaces/bollingerbands';
import { ICandlestick } from '../interfaces/candlestick';


@Injectable({
  providedIn: 'root'
})
export class TaService {

  constructor() { }

  simpleMovingAverage(priceData: ICandlestick[], averageLength: number): number[] {
    let sma = [];
    
    for (let x=0; x<priceData.length; x++) {
      if (x < averageLength-1) {
        sma.push(NaN);
      } else {
        let templist = [];
        for (let y=x; y>x-averageLength; y--) {
          templist.push(priceData[y].open);
        }
        let sum = 0;
        templist.forEach(price => {
          sum += +price;
        });
        sma.push(sum / averageLength);
      }
    }
    // console.log("SIMPLE MOVING AVERAGE", sma.length, sma);
    return sma
  }

  
  exponentialMovingAverage(priceData: ICandlestick[], averageLength: number) {

  }


  bollingerBands(priceData: ICandlestick[], averageLength: number, deviations: number): BollingerBands {

    let bollingerBands: BollingerBands = {upper: [], lower: [], middle: []};

    let sma = this.simpleMovingAverage(priceData, averageLength);

    sma.forEach(price => {
      let deviation: number = 0;
      let currentIndex: number = sma.indexOf(price);
      for (let x=currentIndex; x>currentIndex-averageLength; x--) {
        if (currentIndex >= averageLength - 1) {
          deviation += ((+priceData[x].close - price) ** 2);
        } else {
          
        }
      }
      let averageDeviation: number = Math.sqrt(deviation/averageLength);
      bollingerBands.upper.push(price + (deviations * averageDeviation));
      bollingerBands.middle.push(price);
      bollingerBands.lower.push(price - (deviations * averageDeviation));
    });
    return bollingerBands;
  }
}
