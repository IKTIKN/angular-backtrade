import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITooltipData } from 'src/app/interfaces/tooltipdata';
import { BinanceDataService } from 'src/app/services/binance-data.service';
import { TaService } from 'src/app/services/ta.service';


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
  colorAxis = '#636c77';
  colorAxisPointerLabel = ['#c9d1d9', '#000'];
  colorCrosshair = '#484f58';
  colorTextTooltip = '#82b1ff';

  colorSlowSMA = '#fff';
  colorSMA = '#0091ea';
  colorFastSMA = '#00bfa5';

  timePeriodSlowSMA = 99;
  timePeriodSMA = 25;
  timePeriodFastSMA = 7;

  widthAverageLine = 1;

  widthBar = '70%';

  selectedCandlestickIndex = 0;


  constructor(
    private cd: ChangeDetectorRef,
    private ta: TaService,
    public binance: BinanceDataService
  ) { }


  ngOnInit(): void {
    this.selectedCandlestickIndex = this.binance.binanceCandlesticks.length - 1;
  }


  private tooltip(params: ITooltipData[]) {
    let volumeIndex = 0;
    for (let x=0; x<params.length; x++) {
      if (params[x].seriesType == 'bar') {
        volumeIndex = x;
      }
    }
    this.selectedCandlestickIndex = params[volumeIndex].data[0];
    this.cd.detectChanges();
    return null;
  }
  

  options = {
    animation: false,
    textStyle: {
      fontFamily: 'roboto',
    },
    legend:
    {
      show: true,
      textStyle:
      {
        color: '#f0f6fc',
        fontStyle: 'bold',
        fontSize: 12,
        fontFamily: 'monospace'
      },
      data:
      [
        {
          name: this.binance.selectedSymbol,
          icon: 'none'
        },
        {
          name: 'SMA',
          icon: 'none'
        }
      ],
      inactiveColor: this.colorAxis,
      right: '8%',
    },
    toolbox:
    {
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
    visualMap:
    {
      show: false,
      seriesIndex: 1,
      dimension: 2,
      pieces:
      [
        {
          value: 1,
          color: this.colorUp
        },
        {
          value: -1,
          color: this.colorDown
        }
      ]
    },
    grid:
    [
      {
        left: 0,
        right: '8%',
        height: 420,
        top: 25
      },
      {
        left: 0,
        right: '8%',
        height: 120,
        top: 445,
      }
    ],

    dataZoom: 
    [
      {
        type: 'inside',
        start: 80,
        end: 100,
        xAxisIndex: [0, 1],
        moveOnMouseWheel: false
      },
      {
        show: true,
        type: 'slider',
        xAxisIndex: [0, 1],
        realtime: true,
        start: 20,
        end: 70,
        left: '0%',
        right: '8%',
        bottom: 0,
        height: 10,
        borderColor: '#ffffff00',
        fillerColor: '#ffffff00',
        handleSize: 0,
        handleStyle:
        {
          color: this.colorCrosshair,
          borderType: 'solid'
        },
        moveHandleSize: 7,
        moveHandleStyle:
        {
          color: this.colorCrosshair,
        },
        showDetail: false,
        showDataShadow: false
      }
    ], 
    tooltip:
    {
      show: true,
      alwaysShowContent: false,
      confine: true,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        snap: true,
        crossStyle:
        {
          color: this.colorCrosshair,
          type: 'dashed'
        },
        lineStyle:
        {
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
    axisPointer:
    {
      link:
      {
        xAxisIndex: [0, 1]
      },
      label:
      {
        show: true,
        fontSize: '12',
        backgroundColor: this.colorAxisPointerLabel[0],
        color: this.colorAxisPointerLabel[1]
      }
    },
    xAxis:
    [
      {
        gridIndex: 0,
        splitLine:
        {
          show: this.showSplitlines,
          lineStyle:
          {
            width: 1,
            color: this.colorSplitlines,
            opacity: 0.2
          }
        },
        axisLine:
        {
          show: true,
          lineStyle: {
            color: this.colorAxis,
            width: 1,
            type: 'solid',
            opacity: 0.1
          }
        },
        axisTick:
        {
          show: false
        },
        axisLabel:
        {
          show: false,
          inside: false
        },
        axisPointer:
        {
          type: 'line',
          label:
          {
            show: false
          },
          triggerTooltip: true,
        },
        show: true,
        type: 'category',
        data: this.binance.echartOpenTimes,
        min: 'dataMin',
        max: 'dataMax',
        boundaryGap : true,
      },
      {
        type: 'category',
        gridIndex: 1,
        data: this.binance.echartOpenTimes,
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
        axisTick:
        {
          show: false
        },
        axisLine:
        { 
          show: false,
          lineStyle:
          { 
            color: this.colorSplitlines
          }
        },
        splitNumber: 0,
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis:
    [
      {
        position: 'right',
        axisLine:
        {
          show: true,
          lineStyle:
          {
            color: this.colorAxis,
            width: 2,
            type: 'solid',
            opacity: 0.4
          }
        },
        axisTick:
        {
          show: true,
          inside: false
        },
        axisLabel:
        {
          show: true,
          showMinLabel: false
        },
        type: 'value',
        scale: true,
        splitLine:
        { 
          show: this.showSplitlines,
          interval: 0,
          lineStyle:
          {
            width: 1,
            color: this.colorSplitlines,
            opacity: 0.27
          }
        },
        minorSplitLine:
        {
          show: false,
          lineStyle:
          {
            width: 1,
            color: this.colorSplitlines,
            opacity: 0.2
          }
        },
        splitArea:
        {
          show: false
        }
      },
      {
        position: 'right',
        axisLine:
        {
          show: true,
          lineStyle:
          {
            color: this.colorAxis,
            width: 2,
            type: 'solid',
            opacity: 0.4
          }
        },
        axisLabel:
        {
          show: true,
          showMaxLabel: false,
          showMinLabel: false
        },
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisTick:
        {
          show: true
        },
        splitLine:
        { 
          show: this.showSplitlines,
          interval: 0,
          lineStyle:
          {
            width: 1,
            color: this.colorSplitlines,
            opacity: 0.27
          }
        }
      }
    ],
    series:
    [
      {
        type: 'candlestick',
        data: this.binance.echartCandlesticks,
        name: this.binance.selectedSymbol,
        barWidth: this.widthBar,
        legendHoverLink: false,
        itemStyle:
        {
          color: this.colorUp,
          color0: this.colorDown,
          borderColor: null,
          borderColor0: null
        }
      },
      {
        type: 'bar',
        name: 'Volume',
        data: this.binance.echartVolumes,
        barWidth: this.widthBar,
        legendHoverLink: false,
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle:
        {
          opacity: 0.5
        }
      },
      {
        type: 'line',
        name: 'SMA',
        data: this.ta.SimpleMovingAverage(this.binance.binanceCandlesticks, this.timePeriodSlowSMA),
        legendHoverLink: false,
        lineStyle:
        {
          color: this.colorSlowSMA,
          width: this.widthAverageLine
        },
        z: 0,
        smooth: true,
        showSymbol: false,
        emphasis:
        {
          lineStyle:
          {
            width: this.widthAverageLine
          }
        }
      }, 
      {
        type: 'line',
        name: 'SMA',
        data: this.ta.SimpleMovingAverage(this.binance.binanceCandlesticks, this.timePeriodSMA),
        legendHoverLink: false,
        lineStyle:
        {
          color: this.colorSMA,
          width: this.widthAverageLine
        },
        z: 0,
        smooth: true,
        clip: false,
        showSymbol: false,
        emphasis:
        {
          lineStyle:
          {
            width: this.widthAverageLine
          }
        }
      }, 
      {
        type: 'line',
        name: 'SMA',
        data: this.ta.SimpleMovingAverage(this.binance.binanceCandlesticks, this.timePeriodFastSMA),
        legendHoverLink: false,
        lineStyle:
        {
          color: this.colorFastSMA,
          width: this.widthAverageLine
        },
        z: 0,
        smooth: true,
        clip: false,
        showSymbol: false,
        emphasis:
        {
          lineStyle:
          {
            width: this.widthAverageLine
          }
        }
      }
    ]
  };
}