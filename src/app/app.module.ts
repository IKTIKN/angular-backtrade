import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CandlesticksComponent } from './tradingview/candlesticks/candlesticks.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { HomeComponent } from './home/home.component';
import { TradingviewComponent } from './tradingview/tradingview.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { VolumeComponent } from './tradingview/volume/volume.component';
import { TooltipComponent } from './tradingview/candlesticks/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    CandlesticksComponent,
    HomeComponent,
    TradingviewComponent,
    MenuBarComponent,
    VolumeComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
