import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CandlesticksComponent } from './components/tradingview/candlesticks/candlesticks.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { HomeComponent } from './components/home/home.component';
import { TradingviewComponent } from './components/tradingview/tradingview.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { TooltipComponent } from './components/tradingview/candlesticks/tooltip/tooltip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { SymbolBarComponent } from './components/tradingview/symbol-bar/symbol-bar.component';
import { MarketviewComponent } from './components/marketview/marketview.component';
import { AllMarketsComponent } from './components/marketview/all-markets/all-markets.component';
import { ExchangeInfoComponent } from './components/home/exchange-info/exchange-info.component';
import { IntervalBarComponent } from './components/tradingview/interval-bar/interval-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CandlesticksComponent,
    HomeComponent,
    TradingviewComponent,
    MenuBarComponent,
    TooltipComponent,
    LoadingComponent,
    SymbolBarComponent,
    MarketviewComponent,
    AllMarketsComponent,
    ExchangeInfoComponent,
    IntervalBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
