import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  {
    path: "userlist",
    component: UserlistComponent 
    ,canActivate : [AuthGuard]
  },
  {
    path: "ajouter",
    component: AjouterComponent ,canActivate : [AuthGuard]
  },
  
  {path: 'user-detail/:id' , component : UserDetailComponent,canActivate : [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
