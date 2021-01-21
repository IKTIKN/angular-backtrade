import { Component, OnInit } from '@angular/core';
import { CandlestickDataService } from 'src/app/candlestick-data.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

  title = 'Volume';
  
  options = {
    grid: {
      top: '10%',
      left: '5%',
      right: '5%'
    },

    dataZoom: {
      type: 'inside',
      start: 50,
      end: 100,
      moveOnMouseWheel: false
    },
    tooltip: {
      show: true,
      alwaysShowContent: false,
      trigger: 'item',
    },

    xAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: '#424242',
          opacity: 0.2
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#424242',
          width: 1,
          type: 'solid',
          opacity: 0.7
        }
      },
      show: true,
      type: 'category',
      data: this.data.echartOpenTimes,
    },
    yAxis: {
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#424242',
          width: 1,
          type: 'solid',
          opacity: 0.7
        }
      },
      type: 'value',
      scale: true,
      splitLine: { 
        show: true,
        interval: 0,
        lineStyle: {
          width: 1,
          color: '#424242',
          opacity: 0.27
        }
      },
      minorSplitLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: '#424242',
          opacity: 0.2
        }
      },
      splitArea: {
        show: false
      }
    },
    series: [
      {
        name: 'volume',
        type:'bar',
        barWidth: '70%',
        itemStyle: {
          color: '#BF360C',

        },
        data: this.data.echartVolumes
      }
    ],
  };

  constructor(private data: CandlestickDataService) { }

  ngOnInit(): void {
  }

}
