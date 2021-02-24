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
  colorAxis = '#636c77';
  colorAxisPointerLabel = ['#c9d1d9', '#000'];
  colorCrosshair = '#484f58';
  colorTextTooltip = '#82b1ff';

  colorSlowSMA = '#fff';
  colorSMA = '#0091ea';
  colorFastSMA = '#00bfa5';

  widthAverageLine = 1;


  constructor(
    private cd: ChangeDetectorRef,
    private data: CandlestickDataService,
    private tooltipData: TooltipDataService
    ) { }


  ngOnInit(): void {

  }


  test() {
    this.data.setTradingView('LTCUPUSDT', '5m');
    console.log('TEST', this.data.dataLoaded);
  }


  tooltip(params: any) {
    this.tooltipData.setTooltipData(params);
    this.tooltipData.setBinanceData(this.data.binanceCandlesticks);
    this.cd.detectChanges();
    return null;
  }
  

  options = {
    animation: false,
    textStyle: {
      fontFamily: 'monospace'
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
          name: this.data.selectedSymbol,
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
        // handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
        // moveHandleIcon: 'M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z',
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
        data: this.data.echartOpenTimes,
        min: 'dataMin',
        max: 'dataMax',
        boundaryGap : true,
      },
      {
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
        data: this.data.echartCandlesticks,
        name: this.data.selectedSymbol,
        barWidth: '70%',
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
        data: this.data.echartVolumes,
        barWidth: '70%',
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
        data: this.data.echartSlowSMA,
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
        data: this.data.echartSMA,
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
        data: this.data.echartFastSMA,
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
        animationDuration: 200,
        animationEasing: 'linear',
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
