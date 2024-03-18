import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EqlistComponent } from './eqlist/eqlist.component';
import { AjoutereqComponent } from './ajoutereq/ajoutereq.component';
import { EquipementDetailComponent } from './equipement-detail/equipement-detail.component';

const routes: Routes = [
  {
    path: "eqlist",
    component: EqlistComponent  
  },
  {
    path: "ajoutereq",
    component: AjoutereqComponent   
  },
  {
    path: "equipement-detail/:id",
    component: EquipementDetailComponent   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementTyRoutingModule { }
