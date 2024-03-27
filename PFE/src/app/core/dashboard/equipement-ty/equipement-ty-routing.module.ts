import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EqlistComponent } from './eqlist/eqlist.component';
import { AjoutereqComponent } from './ajoutereq/ajoutereq.component';
import { EquipementDetailComponent } from './equipement-detail/equipement-detail.component';
import { UpdateEqComponent } from './update-eq/update-eq.component';

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
 {
    path: "update-eq/:EquipmentTypeID",
    component: UpdateEqComponent   
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementTyRoutingModule { }
