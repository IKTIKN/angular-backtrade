import { Injectable } from '@angular/core';
import { ICandlestick } from './candlestick-data.service';

@Injectable({
  providedIn: 'root'
})
export class TaService {

  constructor() { }

  SimpleMovingAverage(priceData: ICandlestick[], averageLength: number): number[] {
    let sma = [];
    
    for (let x=0; x<priceData.length; x++) {
      if (x < averageLength-1) {
        sma.push(NaN);
      } else {
        let templist = [];
        for (let y=x; y>x-averageLength; y--) {
          templist.push(priceData[y][1]);
        }
        let sum = 0;
        templist.forEach(price => {
          sum += +price;
        });
        sma.push(sum / averageLength);
      }
    }
    console.log("SIMPLE MOVING AVERAGE", sma.length, sma);
    
    return sma
  }

  ExponentialMovingAverage() {

  }

  BollingerBands() {

  }
}
