import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { PieceFormComponent } from './crudpiece/addpiece/piece.component';
import { PiecelistComponent } from './crudpiece/piecelist/piecelist.component';
import { EditPieceComponent } from './crudpiece/edit-piece/edit-piece.component';
import { StockComponent } from './stocks/stocks.component';
import { AddStockComponent } from './stocks/crudstock/addstock/add-stock.component';
import { CommandeComponent } from './commande/commande.component';
import { LocationComponent } from './location/location.component';
import { AddlocationComponent } from './location/crudlocation/addlocation/addlocation.component';
import { UtilisationComponent } from './utilisation/utilisation.component';
import { AddutilisationComponent } from './utilisation/crudutilisation/addutilisation/addutilisation.component';
import { UpdatelocationComponent } from './location/crudlocation/updatelocation/updatelocation.component';
import { AddfournisseurComponent } from './fournisseur/addfournisseur/addfournisseur.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { UpdateutilisationComponent } from './utilisation/crudutilisation/updateutilisation/updateutilisation.component';
import { EditfournisseurComponent } from './fournisseur/editfournisseur/editfournisseur.component';
import { UpdatecommandeComponent } from './commande/updatecommande/updatecommande.component';
import { AddcommandeComponent } from './commande/addcommande/addcommande.component';
import { MajStockComponent } from './stocks/crudstock/maj-stock/maj-stock.component';
import { DetaillsComponent } from '../dashboard/users-technician-groups/detaills/detaills.component';
import { DetailsfourniComponent } from './fournisseur/detailsfourni/detailsfourni.component';


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
{ path: "addstock", component: AddStockComponent },
{ path: "maj-stock/:id", component: MajStockComponent },

{ path: "commande", component: CommandeComponent  },
{ path: "addcommande", component: AddcommandeComponent  },
{ path: "updatecommande/:id", component: UpdatecommandeComponent   },

//{ path: "addcommande", component: AddcommandeComponent  },

{ path: "location", component: LocationComponent   },
{ path: "addlocation", component: AddlocationComponent  },
{ path: "updatelocation/:id", component: UpdatelocationComponent   },

{ path: "utilisation", component: UtilisationComponent  },
{ path: "addutilisation", component: AddutilisationComponent  },
{ path: "updateutilisation/:id", component: UpdateutilisationComponent  },

{ path: "fournisseur", component: FournisseurComponent  },
{ path: "addfournisseur", component: AddfournisseurComponent  },
{ path: "editfournisseur/:id", component: EditfournisseurComponent   },
{ path: "detailfournisseur/:id", component: DetailsfourniComponent   },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
