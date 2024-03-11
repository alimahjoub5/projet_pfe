import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {
    path: "userlist",
    component: UserlistComponent 
  },
  {
    path: "ajouter",
    component: AjouterComponent 
  },
  
  {path: 'user-detail/:id' , component : UserDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
