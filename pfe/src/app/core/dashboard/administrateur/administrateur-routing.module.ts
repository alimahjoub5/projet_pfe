import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './ajouter/ajouter.component';
import { UserlistComponent } from './userlist/userlist.component';


const routes: Routes = [
  {
    path: "userlist",
    component: UserlistComponent 
  },
  {
    path: "ajouter",
    component: AjouterComponent 
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
