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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CandlesticksComponent,
    HomeComponent,
    TradingviewComponent,
    MenuBarComponent,
    VolumeComponent,
    TooltipComponent,
    LoadingComponent
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
