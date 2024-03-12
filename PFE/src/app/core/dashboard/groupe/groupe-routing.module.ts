import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupelistComponent } from './groupelist/groupelist.component';
import { AjouterComponent } from './ajoutergrp/ajoutergrp.component';

const routes: Routes = [
  {
    path: "groupelist",
    component: GroupelistComponent 
  },
  {
    path: "ajoutergrp",
    component: AjouterComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
