import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { StockFormComponent } from './addStocks/stocks.component';
import { ListStocksComponent } from './list-stocks/list-stocks.component';

const routes: Routes = [
/*  {
    path: "home",
    component: HomeComponent
  },
  { path: "about", component: AboutComponent ,canActivate : [AuthGuard]},
egouefvu
*/
  { path: "stocks", component: StockFormComponent },
  { path: "listStocks", component: ListStocksComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
