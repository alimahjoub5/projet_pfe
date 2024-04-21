import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { PieceFormComponent } from './crudpiece/addpiece/piece.component';
import { PiecelistComponent } from './piecelist/piecelist.component';
import { EditPieceComponent } from './crudpiece/edit-piece/edit-piece.component';
import { StockComponent } from './stocks/stocks.component';
import { StockFormComponent } from './stocks/crudstock/addstock/add-stock.component';

const routes: Routes = [
/*  {
    path: "home",
    component: HomeComponent
  },
  { path: "about", component: AboutComponent ,canActivate : [AuthGuard]},

*/
{ path: "addpiece", component: PieceFormComponent },
{ path: "piecelist", component: PiecelistComponent },
{ path: "majpiece/:id", component: EditPieceComponent },
{ path: "stocks", component: StockComponent },
{ path: "addstocks", component: StockFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
