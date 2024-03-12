import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupelistComponent } from './groupelist/groupelist.component';
import { AjouterComponent } from './ajoutergrp/ajoutergrp.component';
import { GroupeDetailComponent } from './groupe-detail/groupe-detail.component';

const routes: Routes = [
  {
    path: "groupelist",
    component: GroupelistComponent 
  },
  {
    path: "ajoutergrp",
    component: AjouterComponent 
  },
  {
    path: "groupe-detail/:id",
    component: GroupeDetailComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
