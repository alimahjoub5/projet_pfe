import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EqlistComponent } from './eqlist/eqlist.component';

const routes: Routes = [
  {
    path: "eqlist",
    component: EqlistComponent  
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementTyRoutingModule { }
