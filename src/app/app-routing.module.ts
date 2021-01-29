import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TradingviewComponent } from './tradingview/tradingview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tradingview', component: TradingviewComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }