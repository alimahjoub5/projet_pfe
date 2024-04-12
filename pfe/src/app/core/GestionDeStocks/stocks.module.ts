import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { StockFormComponent } from './addStocks/stocks.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StockFormComponent, ButtonModule,ChartModule
  ]
})
export class StocksModule { }
