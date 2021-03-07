import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MarketviewComponent } from '../components/marketview/marketview.component';
import { TradingviewComponent } from '../components/tradingview/tradingview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tradingview/:symbol/:interval', component: TradingviewComponent },
  { path: 'marketview', component: MarketviewComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
