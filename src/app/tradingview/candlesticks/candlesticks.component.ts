import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CandlestickDataService, ICandlestick} from 'src/app/candlestick-data.service';
import { TooltipDataService } from 'src/app/tooltip-data.service';

@Component({
  selector: 'app-candlesticks',
  templateUrl: './candlesticks.component.html',
  styleUrls: ['./candlesticks.component.css']
})
export class CandlesticksComponent implements OnInit {



  title = 'Candlesticks';

  showSplitlines = true;
  showSlider = false;

  colorUp = '#107C10';
  colorDown = '#E81123';
  colorSplitlines = '#30363d';
  colorAxis = '#484f58';
  colorAxisPointerLabel = ['#c9d1d9', '#000'];
  colorCrosshair = '#484f58';
  colorTextTooltip = '#484f58';

  constructor(
    private cd: ChangeDetectorRef,
    private data: CandlestickDataService,
    private tooltipData: TooltipDataService
    ) { }

  ngOnInit(): void {

  }

  tooltip(params: any) {
    this.tooltipData.setTooltipData(params);
    this.tooltipData.setBinanceData(this.data.binanceCandlesticks);
    this.cd.detectChanges();
    return null;
  }

  private getDataMin() {
    var min = 1000000;
    var max = 0;
    for (var x = 0; x < this.data.echartCandlesticks.length; x++) {
      if (this.data.echartCandlesticks[x][2] < min) {
        min = this.data.echartCandlesticks[x][2];
      }
      if (this.data.echartCandlesticks[x][3] > max) {
        max = this.data.echartCandlesticks[x][2];
      }
    }
    console.log(min, max)
    return min - 500;
  }

  options = {
    animation: false,

    textStyle: {
      fontFamily: 'monospace'
    },
    legend: {
      show: false
    },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {
          backgroundColor: '#424242'
        }
      },
      right: '10%',
      itemGap: 10
    },
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 2,
      pieces: [{
          value: 1,
          color: this.colorUp
      }, {
          value: -1,
          color: this.colorDown
      }]
  },
    grid: [{
      left: '3%',
      right: '9%',
      height: '75%',
      top: '2%'
    }, {
      left: '3%',
      right: '9%',
      height: '18%',
      top: '77%'
    }],

    dataZoom: [{
      type: 'inside',
      start: 80,
      end: 100,
      xAxisIndex: [0, 1],
      moveOnMouseWheel: false
    },
      {
        show: false,
        type: 'slider',
        xAxisIndex: [0, 1],
        realtime: true,
        start: 20,
        end: 70,
        top: 0,
        height: 25,
        //handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '100%',
        borderColor: '#424242',
        handleStyle: {
          color: '#000',
          borderType: 'solid'
        },
        filterMode: 'empty'
    }
  ], 
    tooltip: {
      show: true,
      alwaysShowContent: false,
      confine: true,
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          snap: true,
          crossStyle: {
            color: this.colorCrosshair,
            type: 'dashed'
          },
           lineStyle: {
             color: this.colorCrosshair,
             type: 'dashed'
           }
      },
      appendToBody: true,
      borderWidth: 0,
      backgroundColor: 'none',
      position: [0, 0],
      formatter: (params) => {
        return this.tooltip(params);
      }
    },
    axisPointer: {
      link: {
        xAxisIndex: [0, 1]
      },
      label: {
        show: true,
        fontSize: '12',
        backgroundColor: this.colorAxisPointerLabel[0],
        color: this.colorAxisPointerLabel[1]
      }
    },
    xAxis: [{
      gridIndex: 0,
      splitLine: {
        show: this.showSplitlines,
        lineStyle: {
          width: 1,
          color: this.colorSplitlines,
          opacity: 0.2
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: this.colorAxis,
          width: 1,
          type: 'solid',
          opacity: 0.1
        }
      },
      axisTick: { show: false},
      axisLabel: {
        show: false,
        inside: false
      },
      axisPointer: {
        type: 'line',
        label: {show: false},
        triggerTooltip: true,
      },
      show: true,
      type: 'category',
      data: this.data.echartOpenTimes,
      min: 'dataMin',
      max: 'dataMax',
      boundaryGap : true,
    },{
      type: 'category',
      gridIndex: 1,
      data: this.data.echartOpenTimes,
      scale: true,
      boundaryGap : true,
      splitLine: { 
        show: this.showSplitlines,
        interval: 'auto',
        lineStyle: {
          width: 1,
          color: this.colorSplitlines,
          opacity: 0.27
        }
      },
      axisLabel: {
        show: true,
        color: this.colorAxis
      },
      axisTick: {show: false},
      axisLine: { 
        show: false,
        lineStyle: { 
          color: this.colorSplitlines
        }
      },
      splitNumber: 0,
      min: 'dataMin',
      max: 'dataMax'
    }],
    yAxis: [{
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: this.colorAxis,
          width: 2,
          type: 'solid',
          opacity: 0.4
        }
      },
      axisTick: {
        show: true,
        inside: false
      },
      axisLabel: {
        show: true,
        showMinLabel: false
      },
      type: 'value',
      scale: true,
      splitLine: { 
        show: this.showSplitlines,
        interval: 0,
        lineStyle: {
          width: 1,
          color: this.colorSplitlines,
          opacity: 0.27
        }
      },
      minorSplitLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: this.colorSplitlines,
          opacity: 0.2
        }
      },
      splitArea: {
        show: false
      }
      }, {
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: this.colorAxis,
          width: 2,
          type: 'solid',
          opacity: 0.4
        }
      },
      axisLabel: {
        show: true,
        showMaxLabel: false,
        showMinLabel: false
      },
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisTick: {show: true},
      splitLine: { 
        show: this.showSplitlines,
        interval: 0,
        lineStyle: {
          width: 1,
          color: this.colorSplitlines,
          opacity: 0.27
        }
      }
    }
  ],

    series: [
      {
        data: this.data.echartCandlesticks,
        type: 'candlestick',
        itemStyle: {
          color: this.colorUp,
          color0: this.colorDown,
          borderColor: null,
          borderColor0: null
        },

        name: 'LTC',
        barWidth: '70%',
        animationDuration: 200,
        animationEasing: 'elasticin',

      }, {
        name: 'Volume',
        type: 'bar',
        barWidth: '70%',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
            opacity: 0.4

        },
        // emphasis: {
        //     itemStyle: {
        //         color: '#424242'
        //     }
        // },
        data: this.data.echartVolumes
      }
    ],
  };




}
