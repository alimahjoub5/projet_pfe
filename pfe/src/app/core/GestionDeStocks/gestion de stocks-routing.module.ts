import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { StockFormComponent } from './addStocks/stocks.component';
import { ListStocksComponent } from './list-stocks/list-stocks.component';
import { UpdatestockComponent } from './updatestock/updatestock.component';
import { CommandeComponent } from './commande/commande.component';

const routes: Routes = [
/*  {
    path: "home",
    component: HomeComponent
  },
  { path: "about", component: AboutComponent ,canActivate : [AuthGuard]},

*/
{ path: "addstocks", component: StockFormComponent },
{ path: "liststock", component: ListStocksComponent },
{ path: "updatestock/:stock_id", component: UpdatestockComponent },
{ path: "commander/:stock_id", component: CommandeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
