import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from '../administrateur/ajouter/ajouter.component';
import { GroupelistComponent } from './groupelist/groupelist.component';

const routes: Routes = [
    {
      path: "ajouter",
      component: AjouterComponent 
    },
    {
      path: "groupelist",
      component: GroupelistComponent
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
